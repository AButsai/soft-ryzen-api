import { AttemptsService } from '@entities/attempts/attempts.service';
import { InternshipStream } from '@entities/internship-stream/internship-stream.entity';
import { MailService } from '@entities/mail/mail.service';
import { TechnicalTest } from '@entities/technical-test/technical-test.entity';
import { Test } from '@entities/tests/tests.entity';
import { TokensService } from '@entities/tokens/tokens.service';
import { RoleEntity } from '@entities/users/role.entity';
import { UserEntity } from '@entities/users/users.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VERIFY_EMAIL } from '@src/constants/mail-path.constants';
import * as regex from '@src/constants/regex-expressions';
import { ERole } from '@src/enums/role.enum';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly attemptsService: AttemptsService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Test) private readonly testsRepository: Repository<Test>,
    @InjectRepository(TechnicalTest)
    private readonly technicalTestRepository: Repository<TechnicalTest>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(InternshipStream)
    private readonly streamRepository: Repository<InternshipStream>,
    private readonly mailService: MailService,
    private readonly tokensService: TokensService,
  ) {}

  // Register
  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<LoginResponseDto> {
    const { email, password } = registerUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new ConflictException('User is already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyToken = v4();
    await this.mailService.sendEmailHandler(
      email,
      verifyToken,
      VERIFY_EMAIL,
      null,
    );

    const role = this.roleRepository.create({
      role: ERole.USER,
    });

    const newUser = this.userRepository.create({
      ...registerUserDto,
      password: hashedPassword,
      verifyToken,
    });
    newUser.roles = [role];

    await this.roleRepository.save(role);
    await this.userRepository.save(newUser);

    return await this.responseData(newUser.email);
  }

  // Login
  public async login(loginDto: LoginDto, userIp: string) {
    const user = await this.userValidate(
      loginDto.email,
      loginDto.password,
      userIp,
    );

    return await this.responseData(user.email);
  }

  // Response data
  public async responseData(email: string) {
    const user: UserEntity = await this.getUser('email', email);
    const stream: InternshipStream = await this.streamRepository.findOne({
      where: { id: user.streamId },
    });
    const test: Test = await this.testsRepository.findOne({
      where: { streamNumber: stream?.id },
    });
    const techTest: TechnicalTest = await this.technicalTestRepository.findOne({
      where: { direction: user.direction },
    });
    const tokens = await this.tokensService.generateTokens(user);
    const roles: string[] = user.roles.map((role) => role.role);

    const streamData = {
      id: stream?.id,
      streamDirection: stream?.streamDirection,
      isActive: stream?.isActive,
      startDate: stream?.startDate,
    };
    const userData = {
      id: user.id,
      roles,
      isLabelStream: user.isLabelStream,
      stream: stream ? streamData : {},
      isVerifiedEmail: user.verified,
      test: {
        isSent: user.isSentTest,
        isSuccess: user.isPassedTest,
        startDate: test ? test.availabilityStartDate : null,
        endDate: test ? test?.availabilityEndDate : null,
      },
      task: {
        isSent: user.isSentTechnicalTask,
        isSuccess: user.isPassedTechnicalTask,
        deadlineDate: techTest ? techTest?.deadline : null,
      },
    };
    const responseData: LoginResponseDto = {
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
      user: userData,
    };

    if (!user.firstName || !user.phone) {
      return responseData;
    }

    userData['firstName'] = user.firstName;
    userData['avatar'] = user.avatar;
    userData['direction'] = user.direction;

    return responseData;
  }

  // Check phone
  public async checkPhone(phone: string) {
    const user = await this.userRepository.findOne({ where: { phone } });
    if (user) {
      throw new ConflictException('Phone number already exists');
    }
    return 'OK';
  }

  // User validate
  private async userValidate(email: string, password: string, userIp: string) {
    const user = await this.getUser('email', email);
    if (!user.password) {
      throw new BadRequestException('Update your password');
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      await this.attemptsService.attempts(userIp);
      throw new UnauthorizedException('Password is wrong');
    }
    if (!user.verified) {
      throw new UnauthorizedException('Email not verified');
    }
    await this.attemptsService.deleteAttempts(userIp);
    return user;
  }

  // Get user
  private async getUser(field: string, value: string) {
    const user = await this.userRepository.findOne({
      where: { [field]: value },
      relations: ['roles'],
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Not found');
  }

  // Get regular expression
  public async getRegularExpression() {
    const linkRegex = new RegExp(regex.linkRegex).toString();
    const telegramRegex = new RegExp(regex.telegramRegex).toString();
    const phoneRegex = new RegExp(regex.phoneRegex).toString();
    const passwordRegex = new RegExp(regex.passwordRegex).toString();
    const emailRegex = new RegExp(regex.emailRegex).toString();

    return {
      linkRegex,
      telegramRegex,
      phoneRegex,
      passwordRegex,
      emailRegex,
    };
  }

  // Logout
  public async logout(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Not found');
    }
    await this.userRepository.update(user.id, {
      refreshToken: null,
    });
  }
}
