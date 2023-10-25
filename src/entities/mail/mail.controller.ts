import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
  CheckEmailResponseDto,
  EmailDto,
  EmailResendResponseDto,
} from './dto/mail.dto';
import { MailService } from './mail.service';

@ApiTags('Email')
@Controller('api/email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  // Check email
  @ApiOperation({ summary: 'Check email' })
  @ApiResponse({ status: 201, type: CheckEmailResponseDto })
  @ApiConflictResponse({ description: 'Email already exists' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('check-email')
  async checkPhone(@Body() body: EmailDto) {
    return this.mailService.checkEmail(body.email);
  }

  // Verify email
  @Get('verify-email/:verificationToken')
  @ApiOperation({ summary: 'User email verification' })
  async verifyEmail(
    @Param('verificationToken') verificationToken: string,
    @Res() res: Response,
  ) {
    const userData = await this.mailService.verifyEmail(verificationToken);
    const redirectUrl = `${
      process.env.REDIRECT_TO_SITE_INTERNSHIP
    }?userData=${encodeURIComponent(JSON.stringify(userData))}`;
    res.redirect(redirectUrl);
  }

  // Resend email
  @ApiOperation({ summary: 'Resend email' })
  @ApiResponse({
    status: 201,
    description: 'Email resend',
    type: EmailResendResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiConflictResponse({ description: 'Email is already verified' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('resend-email')
  async resendingEmail(@Body() body: EmailDto) {
    return this.mailService.resendEmail(body.email);
  }
}
