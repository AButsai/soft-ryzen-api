import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class PhoneDto {
  @ApiProperty({
    example: '+380999999999',
    description: 'User phone',
    required: true,
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  public phone: string;
}

export class PhoneCodeDto {
  @ApiProperty({ example: '+380', description: 'Country calling code' })
  public phone_code: string;

  @ApiProperty({ example: 'Ukraine', description: 'Country name' })
  public name: string;

  @ApiProperty({ example: 'UA', description: 'Country alpha2' })
  public alpha2: string;

  @ApiProperty({
    example: 'https://flagcdn.com/ua.svg',
    description: 'Country flag .svg',
  })
  public flag_url: string;
}
