import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import { Column, Entity } from 'typeorm';
import { Difficulty } from './enums/difficulty.enum';

@Entity()
export class Question extends MyBaseEntity {
  @ApiProperty({ example: 'What is Node.js?', description: 'Text question' })
  @Column({ name: 'questionText', type: 'varchar' })
  questionText: string;

  @ApiProperty({ example: '123', description: 'Code of question' })
  @Column({ name: 'code', type: 'varchar', nullable: true })
  code: string;

  @ApiProperty({
    example: ['Answer 1', 'Answer 2'],
    description: 'Answers to the question',
  })
  @Column({ name: 'answers', type: 'varchar', array: true })
  answers: string[];

  @ApiProperty({ example: 2, description: 'Index of the correct answer' })
  @Column()
  correctAnswerIndex: number;

  @ApiProperty({ example: 'Backend', description: 'Question direction' })
  @Column()
  direction: string;

  @ApiProperty({ example: 'CSS', description: 'Question block' })
  @Column({ name: 'block_questions', type: 'varchar' })
  blockQuestions: string;

  @ApiProperty({ example: 'Easy', description: 'Question difficulty' })
  @Column({ name: 'difficulty', type: 'enum', enum: Difficulty })
  difficulty: string;

  @ApiProperty({ example: 3, description: 'Question points' })
  @Column()
  points: number;
}
