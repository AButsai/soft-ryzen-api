import { ApiProperty } from '@nestjs/swagger';

export class ResponseDashboardDto {
  @ApiProperty({ example: 4, description: 'Total number of directions' })
  public totalNumberOfDirections: number;

  @ApiProperty({
    example: {
      QA: 1,
      PM: 1,
      FrontEnd: 8,
      BackEnd: 2,
    },
    description: 'The number of students by direction',
  })
  public theNumberOfStudentsByDirection: IStudentsByDirection;

  @ApiProperty({ example: 30, description: 'How many candidates registered' })
  public howManyCandidatesRegistered: number;

  @ApiProperty({
    example: 25,
    description: 'How many candidates passed the test',
  })
  public howManyCandidatesPassedTheTest: number;

  @ApiProperty({
    example: 15,
    description: 'How many candidates passed the technical task',
  })
  public howManyCandidatesPassedTheTechnicalTask: number;

  @ApiProperty({
    example: 15,
    description: 'How many technical tasks are checked',
  })
  public howManyTechnicalTasksAreChecked: number;
}

export interface IStudentsByDirection {
  [key: string]: string | number;
}
