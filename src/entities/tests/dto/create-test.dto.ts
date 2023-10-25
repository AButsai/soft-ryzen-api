import { ApiProperty } from '@nestjs/swagger';

export class QuestionDifficultyDto {
  @ApiProperty({ example: 5, description: 'Number of easy questions' })
  easy: number;

  @ApiProperty({ example: 5, description: 'Number of medium questions' })
  medium: number;

  @ApiProperty({ example: 5, description: 'Number of hard questions' })
  hard: number;
}

export class CreateTestDto {
  @ApiProperty({ example: 'Full Stack', description: 'Internship Stream' })
  internshipStream: string;

  @ApiProperty({ example: 1, description: 'Stream number' })
  streamNumber: number;

  @ApiProperty({
    example: '2023-06-30',
    description: 'Availability start date',
  })
  availabilityStartDate: Date;

  @ApiProperty({ example: '2023-08-30', description: 'Availability end date' })
  availabilityEndDate: Date;

  @ApiProperty({ example: 60, description: 'Duration test in minutes' })
  duration: number;

  @ApiProperty({
    example: { easy: 5, medium: 10, hard: 5 },
    description: 'Number of questions per difficulty level',
  })
  questionDifficulty: QuestionDifficultyDto;

  @ApiProperty({
    example: { html: 10, css: 5, javascript: 7 },
    description: 'Number of questions per block',
  })
  questionBlocks: Partial<{ [key: string]: number }>;

  @ApiProperty({ example: 20, description: 'Number of questions in the test' })
  numberOfQuestions: number;

  @ApiProperty({ example: '65%', description: 'Passing score' })
  passingScore: number;
}
