import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import { Column, Entity } from 'typeorm';
import { QuestionDifficultyDto } from './dto/create-test.dto';

@Entity()
export class Test extends MyBaseEntity {
  @ApiProperty({ example: 'Full Stack', description: 'Internship Stream' })
  @Column({ name: 'internshipStream', type: 'varchar' })
  internshipStream: string;

  @ApiProperty({ example: 1, description: 'Stream number' })
  @Column({ name: 'streamNumber', type: 'integer' })
  streamNumber: number;

  @ApiProperty({
    example: '2023-06-30',
    description: 'Availability start date',
  })
  @Column({ name: 'availabilityStartDate', type: 'date' })
  availabilityStartDate: Date;

  @ApiProperty({ example: '2023-08-30', description: 'Availability end date' })
  @Column({ name: 'availabilityEndDate', type: 'date' })
  availabilityEndDate: Date;

  @ApiProperty({ example: 60, description: 'Duration test in minutes' })
  @Column({ name: 'duration', type: 'integer' })
  duration: number;

  @ApiProperty({
    example: { easy: 5, medium: 10, hard: 5 },
    description: 'Number of questions per difficulty level',
  })
  @Column({ name: 'questionDifficulty', type: 'jsonb' })
  questionDifficulty: QuestionDifficultyDto;

  @ApiProperty({
    example: { html: 10, css: 5, javascript: 7 },
    description: 'Number of questions per block',
  })
  @Column({ name: 'questionBlocks', type: 'jsonb', nullable: true })
  questionBlocks: Partial<{ [key: string]: number }>;

  @ApiProperty({ example: 20, description: 'Number of questions in the test' })
  @Column({ name: 'numberOfQuestions', type: 'integer' })
  numberOfQuestions: number;

  @ApiProperty({ example: '65%', description: 'Passing score' })
  @Column({ name: 'passingScore', type: 'integer' })
  passingScore: number;
}
