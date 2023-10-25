import { MailService } from '@entities/mail/mail.service';
import { TokensService } from '@entities/tokens/tokens.service';
import { UserEntity } from '@entities/users/users.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VERIFY_EMAIL_PASS } from '@src/constants/mail-path.constants';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { ChangePasswordDto } from './dto/password.dto';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
    private readonly tokensService: TokensService,
  ) {}

  // Request for change password
  public async requestChangePassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException();
    }
    const verifyToken = v4();
    await this.userRepository.update(user.id, { verifyToken });
    await this.mailService.sendEmailHandler(
      user.email,
      verifyToken,
      VERIFY_EMAIL_PASS,
      user.firstName,
    );
    return { message: 'Email send' };
  }

  // Verify change password
  public async verifyChangePassword(verifyToken: string) {
    const user = await this.userRepository.findOne({
      where: { verifyToken },
      relations: ['roles'],
    });

    if (!user) {
      throw new BadRequestException();
    }
    await this.userRepository.update(user.id, {
      verified: true,
      verifyToken: null,
    });
    return await this.tokensService.generateTokens(user);
  }

  // Change password
  public async changePassword(body: ChangePasswordDto, id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const newHashPass = await bcryptjs.hash(body.password, 10);
    await this.userRepository.update(user.id, { password: newHashPass });
    return { message: 'Password changed' };
  }

  // Resend email
  public async resendEmail(email: string) {
    return await this.mailService.resendEmail(email, VERIFY_EMAIL_PASS);
  }
}
