import {
  EmailDto,
  EmailResendResponseDto,
  EmailSendResponseDto,
} from '@entities/mail/dto/mail.dto';
import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import { Response } from 'express';
import {
  ChangePasswordDto,
  ChangePasswordResponseDto,
} from './dto/password.dto';
import { PasswordService } from './passwords.service';

@ApiTags('Change password')
@Controller('api/passwords')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  // Request for change password
  @ApiOperation({ summary: 'Request change password' })
  @ApiResponse({
    status: 201,
    description: 'Email send',
    type: EmailSendResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post('request')
  async requestChangePassword(@Body() body: EmailDto) {
    return this.passwordService.requestChangePassword(body.email);
  }

  // Verify change password
  @ApiOperation({ summary: 'Verify change password' })
  @ApiOkResponse({ description: 'OK' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get('verify/:verifyToken')
  async verifyChangePassword(
    @Param('verifyToken') verifyToken: string,
    @Res() res: Response,
  ) {
    const tokens = await this.passwordService.verifyChangePassword(verifyToken);

    const redirectUrl = `${
      process.env.REDIRECT_TO_PASSWORD_CHANGE_FORM
    }?userData=${encodeURIComponent(JSON.stringify(tokens))}`;
    res.redirect(redirectUrl);
  }

  // Change password
  @ApiOperation({ summary: 'Password change' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: access_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiOkResponse({ type: ChangePasswordResponseDto })
  @ApiBadRequestResponse({ description: 'Passwords do not match' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: MyRequest,
  ) {
    return this.passwordService.changePassword(changePasswordDto, req.user.id);
  }

  // Resend Email
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
    return this.passwordService.resendEmail(body.email);
  }
}
