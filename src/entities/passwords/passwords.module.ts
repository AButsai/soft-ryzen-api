import { MailModule } from '@entities/mail/mail.module';
import { TokensModule } from '@entities/tokens/tokens.module';
import { UserEntity } from '@entities/users/users.entity';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordController } from './passwords.controller';
import { PasswordService } from './passwords.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MailModule, TokensModule],
  controllers: [PasswordController],
  providers: [PasswordService, JwtService, ConfigService],
})
export class PasswordModule {}
