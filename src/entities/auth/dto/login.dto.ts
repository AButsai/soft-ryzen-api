import { ApiProperty } from '@nestjs/swagger';
import * as regex from '@src/constants/regex-expressions';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UsernameDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'User login',
  })
  @IsString()
  @IsEmail()
  email: string;
}

export class LoginDto extends UsernameDto {
  @ApiProperty({ example: 'password', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(regex.passwordRegex, {
    message: 'Password must contain letters and numbers',
  })
  password: string;
}

export class StreamResponseDto {
  id?: number;
  @ApiProperty({ example: 1, description: 'Ids streams' })
  streamDirection?: string;

  @ApiProperty({ example: 'true', description: 'Status internship stream' })
  isActive?: boolean;

  @ApiProperty({
    example: 'Start date',
    description: 'Start date of internship stream',
  })
  startDate?: Date;
}

export class TestResponseDto {
  @ApiProperty({
    example: false,
    description: 'Start date of internship stream',
  })
  isSent: boolean;

  @ApiProperty({
    example: false,
    description: 'Start date of internship stream',
  })
  isSuccess: boolean;

  @ApiProperty({
    example: '2023-07-12 16:03:20.157888',
    description: 'Start date of internship stream',
  })
  startDate?: Date;

  @ApiProperty({
    example: '2023-07-12 16:03:20.157888',
    description: 'Start date of internship stream',
  })
  endDate?: Date;
}

export class TaskResponseDto {
  @ApiProperty({
    example: false,
    description: 'Start date of internship stream',
  })
  isSent: boolean;

  @ApiProperty({
    example: false,
    description: 'Start date of internship stream',
  })
  isSuccess: boolean;

  @ApiProperty({
    example: '2023-07-12 16:03:20.157888',
    description: 'Start date of internship stream',
  })
  deadlineDate?: Date;
}

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'User id' })
  id: number;

  @ApiProperty({ example: 'Peter', description: 'User name' })
  firstName?: string;

  @ApiProperty({ example: 'url avatar', description: 'User avatar' })
  avatar?: string;

  @ApiProperty({ example: 'FrontEnd', description: 'User direction' })
  direction?: string;

  @ApiProperty({
    example: false,
    description: 'A label about the presence of active threads',
  })
  isLabelStream: boolean;

  @ApiProperty({
    example: ['user'],
    description: 'User`s role',
  })
  roles: string[];

  @ApiProperty({ type: () => StreamResponseDto })
  stream?: StreamResponseDto;

  @ApiProperty({ type: () => TestResponseDto })
  test?: TestResponseDto;

  @ApiProperty({ type: () => TaskResponseDto })
  task?: TaskResponseDto;
}

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'User refresh token"',
  })
  refreshToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'User success token',
  })
  accessToken: string;

  @ApiProperty({ type: () => UserResponseDto })
  user: UserResponseDto;
}

export class LogoutResponseDto {
  @ApiProperty({
    example: 'Disconnect...',
    description: 'User logout',
  })
  message: string;
}
