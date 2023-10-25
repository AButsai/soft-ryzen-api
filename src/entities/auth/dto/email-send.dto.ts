import { ApiProperty } from '@nestjs/swagger';

export class EmailSendResponseDto {
  @ApiProperty({ example: 'Email send', description: 'Email send' })
  message: string;
}

export class EmailResendResponseDto {
  @ApiProperty({ example: 'Email resend', description: 'Email resend' })
  message: string;
}
