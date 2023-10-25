import {
  Configuration,
  EmailMessageData,
  EmailsApi,
} from '@elasticemail/elasticemail-client-ts-axios';
import { TokensService } from '@entities/tokens/tokens.service';
import { UserEntity } from '@entities/users/users.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VERIFY_EMAIL } from '@src/constants/mail-path.constants';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
  private readonly elasticEmailService: EmailsApi;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokensService: TokensService,
  ) {
    const config = new Configuration({
      apiKey: process.env.ELASTIC_API_KEY,
    });

    this.elasticEmailService = new EmailsApi(config);
  }

  // Check email
  public async checkEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new ConflictException('Email already exists');
    }
    return { available: true };
  }

  // Send email handler
  public async sendEmailHandler(
    email: string,
    verifyToken: string,
    path: string,
    firstName?: string,
  ) {
    const name = firstName ? firstName : email;
    const linkForEmail = this.generateUrlForEmailSend(email, verifyToken, path);
    await this.sendEmail(email, linkForEmail, name);

    return true;
  }

  // Verify email
  public async verifyEmail(verifyToken: string) {
    const user = await this.userRepository.findOne({
      where: { verifyToken },
      relations: ['roles'],
    });
    if (!user) {
      throw new BadRequestException('Email is verified');
    }
    await this.userRepository.update(user.id, {
      verified: true,
      verifyToken: null,
    });
    return await this.tokensService.generateTokens(user);
  }

  // Resend email
  public async resendEmail(email: string, path = VERIFY_EMAIL) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.verifyToken) {
      throw new BadRequestException('Email is verified');
    }
    const linkForEmail = this.generateUrlForEmailSend(
      email,
      user.verifyToken,
      path,
    );
    const name = user.firstName ? user.firstName : email;
    await this.sendEmail(email, linkForEmail, name);

    return { message: 'Email resend' };
  }

  // Generate url for email send
  private generateUrlForEmailSend(
    name: string,
    verifyToken: string,
    path: string,
  ) {
    return `<p>Hi ${name}, please confirm that this is your email address</p><a href="${process.env.BASE_URL}/api/${path}/${verifyToken}">Confirm email</a>`;
  }

  // Send email
  private async sendEmail(
    emailTo: string,
    verifyLink: string,
    firstName = 'Dear User',
  ) {
    try {
      const emailMessageData: EmailMessageData = {
        Recipients: [
          {
            Email: emailTo,
            Fields: {
              name: firstName,
            },
          },
        ],
        Content: {
          Body: [
            {
              ContentType: 'HTML',
              Charset: 'utf-8',
              Content: verifyLink,
            },
            {
              ContentType: 'PlainText',
              Charset: 'utf-8',
              Content: `Hi ${firstName}!`,
            },
          ],
          From: process.env.EMAIL_TO_SEND_FROM,
          Subject: 'Example verify email',
        },
      };

      await this.elasticEmailService.emailsPost(emailMessageData);
      return true;
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }
}
