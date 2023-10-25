import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuestionBlockDto {
  @ApiProperty({ example: 'FrontEnd', description: 'Direction name' })
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  directionName: string;

  @ApiProperty({ example: 'HTML/CSS', description: 'Block name' })
  @IsNotEmpty()
  @IsString()
  blockName: string;
}

export class RequestQuestionBlockDto {
  @ApiProperty({ example: 1, description: 'Questions block id' })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: '2023-06-17T11:48:47.135Z',
    description: 'Questions block createAt',
  })
  @IsString()
  createAt: string;

  @ApiProperty({
    example: '2023-06-17T11:48:47.135Z',
    description: 'Questions block updateAt',
  })
  @IsString()
  updateAt: string;

  @ApiProperty({ example: 'Full stack', description: 'Direction name' })
  @IsString()
  directionName: string;

  @ApiProperty({ example: 'Full stack', description: 'Direction name' })
  @IsString()
  blockName: string;

  @ApiProperty({ example: 1, description: 'User`s id' })
  @IsNumber()
  ownerId: number;

  @ApiProperty({ example: 'admin', description: 'User`s role' })
  @IsString()
  owner: string;
}
