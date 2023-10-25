import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ description: 'Text of the question' })
  readonly questionText: string;

  @ApiProperty({ description: 'Optional code associated with the question' })
  readonly code?: string;

  @ApiProperty({ type: [String], description: 'Array of answers' })
  readonly answers: string[];

  @ApiProperty({ description: 'Index of the correct answer' })
  readonly correctAnswerIndex: number;

  @ApiProperty({ description: 'Direction of the question' })
  readonly direction: string;

  @ApiProperty({ description: 'Block associated with the question' })
  blockQuestions: string;

  @ApiProperty({ description: 'Difficulty level of the question' })
  readonly difficulty: string;

  @ApiProperty({ description: 'Points assigned to the question' })
  readonly points: number;
}
