import { AuthService } from '@entities/auth/auth.service';
import { RoleEntity } from '@entities/users/role.entity';
import { UserEntity } from '@entities/users/users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERole } from '@src/enums/role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly authService: AuthService,
  ) {}

  public async auth(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      return await this.authService.responseData(user.email);
    }

    const role = this.roleRepository.create({
      role: ERole.USER,
    });

    const newUser = this.userRepository.create({
      email,
      verified: true,
    });
    newUser.roles = [role];
    await this.roleRepository.save(role);
    await this.userRepository.save(newUser);

    return await this.authService.responseData(newUser.email);
  }
}
