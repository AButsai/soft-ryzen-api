import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ example: 1, description: 'Unique id user`s' })
  public id: number;

  @ApiProperty({
    example: '2023-06-13T14:58:05.590Z',
    description: 'Create At',
  })
  public createAt: string;

  @ApiProperty({
    example: '2023-06-13T14:58:05.590Z',
    description: 'Update At',
  })
  public updateAt: string;

  @ApiProperty({ example: 'Mark', description: 'User First name' })
  public firstName: string;

  @ApiProperty({ example: 'Spencer', description: 'User Last name' })
  public lastName: string;

  @ApiProperty({ example: 'email@mail.net', description: 'User email' })
  public email: string;

  @ApiProperty({ example: '+380XXXXXXXXX', description: 'User contact phone' })
  public phone: string;

  @ApiProperty({
    example: 't.me/userName',
    description: 'User Telegram contact',
  })
  public telegramContact: string;

  @ApiProperty({
    example: 'Full Stack',
    description: 'Direction in which the user was trained',
  })
  public direction: string;

  @ApiProperty({
    example: 'Group A',
    description: 'Group in which the user studied',
  })
  public group: string;

  @ApiProperty({ example: 'Current city', description: 'User current city' })
  public currentCity: string;

  @ApiProperty({
    example: '/avatars/avatar_pokemon.png',
    description: 'User avatar url',
  })
  public avatar: string;

  @ApiProperty({
    example: 'Group T',
    description: 'Internship field',
  })
  public fieldOfInternship: string;

  @ApiProperty({
    example: '5 stream',
    description: 'Name internship stream',
  })
  public nameInternshipStream: string;

  @ApiProperty({
    example: 'true',
    description: 'Is confirm email',
  })
  public verified: boolean;

  @ApiProperty({
    example: 'user',
    description: 'Role user`s',
  })
  public role: string;

  @ApiProperty({ example: false, description: 'Is passed test' })
  public isPassedTest: boolean;
}
