import { ApiProperty } from '@nestjs/swagger';
import * as regex from '@src/constants/regex-expressions';

export class RegularExpressionResponseDto {
  @ApiProperty({
    example: regex.linkRegex.toString(),
    description: 'Regular expression for link: resume, linkedin, ...',
  })
  public linkRegex: string;

  @ApiProperty({
    example: regex.telegramRegex.toString(),
    description: 'Regular expression for telegram',
  })
  public telegramRegex: string;

  @ApiProperty({
    example: regex.phoneRegex.toString(),
    description: 'Regular expression for phone',
  })
  public phoneRegex: string;

  @ApiProperty({
    example: regex.passwordRegex.toString(),
    description: 'Regular expression for password',
  })
  public passwordRegex: string;

  @ApiProperty({
    example: regex.emailRegex.toString(),
    description: 'Regular expression for email',
  })
  public emailRegex: string;
}
