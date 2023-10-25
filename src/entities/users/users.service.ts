import { AuthService } from '@entities/auth/auth.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERole } from '@src/enums/role.enum';
import { Repository } from 'typeorm';
import {
  IStudentsByDirection,
  ResponseDashboardDto,
} from './dto/response-dashboard.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { UserDto } from './dto/update-user.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  // Current user
  public async currentUser(email: string) {
    return await this.authService.responseData(email);
  }

  // Get user
  public async getUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  // Update user
  public async updateUser(email: string, body: UserDto) {
    const user = await this.getUser(email);
    if (user) {
      await this.userRepository.update(user.id, body);
    }
    return await this.authService.responseData(email);
  }
  // Update direction
  public async updateUserDirection(
    email: string,
    { direction }: UpdateDirectionDto,
  ) {
    const user = await this.getUser(email);
    await this.userRepository.update(user.id, { direction });
    return this.userRepository.findOne({ where: { id: user.id } });
  }

  // Dashboard
  public async dashboard() {
    const usersRegister: UserEntity[] = await this.userRepository.find();
    const users: UserEntity[] = [...usersRegister].filter(
      (user) => user.direction !== ERole.ADMIN,
    );
    const direction = ['QA', 'PM', 'FullStack'];
    const studentsByDirection: IStudentsByDirection = this.userReduce(users);
    const countPassedTest = this.filterUsers(users, 'isPassedTest');
    const countPassedTechnicalTask = this.filterUsers(
      users,
      'isPassedTechnicalTask',
    );

    const data: ResponseDashboardDto = {
      totalNumberOfDirections: direction.length,
      theNumberOfStudentsByDirection: studentsByDirection,
      howManyCandidatesRegistered: users.length,
      howManyCandidatesPassedTheTest: countPassedTest,
      howManyCandidatesPassedTheTechnicalTask: countPassedTechnicalTask,
      howManyTechnicalTasksAreChecked: 16, // !
    };

    return { data: data };
  }

  // Filter users
  private filterUsers(users: UserEntity[], field: string) {
    const countUsers = users.filter((user) => user[field] === true);
    return countUsers.length;
  }

  // User reduce
  private userReduce(users: UserEntity[]) {
    const studentsByDirection: IStudentsByDirection = users?.reduce(
      (acc, { direction }) => {
        if (acc.hasOwnProperty(direction)) {
          acc[direction] = acc[direction] + 1;
        } else {
          acc[direction] = 1;
        }
        return acc;
      },
      {},
    );
    return studentsByDirection;
  }
}
