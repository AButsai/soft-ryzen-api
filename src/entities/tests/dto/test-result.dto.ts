import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TestResult {
  @ApiProperty({ example: 'Mark', description: 'User First name' })
  @IsString()
  public firstName: string;

  @ApiProperty({ example: 'Spencer', description: 'User Last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Full Stack', description: 'Internship Stream' })
  @IsString()
  internshipStream: string;

  @ApiProperty({ example: 1, description: 'Stream number' })
  @IsNumber()
  streamNumber: number;

  @ApiProperty({ example: 34, description: 'Score 0f right answers' })
  @IsNumber()
  score: number;
}
