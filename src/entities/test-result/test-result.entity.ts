import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tests_results' })
export class TestsResult extends MyBaseEntity {
  @ApiProperty({ example: 'Mark', description: 'User First name' })
  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @ApiProperty({ example: 'Spencer', description: 'User Last name' })
  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @ApiProperty({ example: 'Full stack', description: 'Internship direction' })
  @Column({ name: 'internship_direction', type: 'varchar' })
  direction: string;

  @ApiProperty({ example: 1, description: 'Stream number' })
  @Column({ name: 'number', type: 'integer' })
  number: number;

  @ApiProperty({ example: 1, description: 'Total score' })
  @Column({ name: 'score', type: 'integer' })
  score: number;

  @ApiProperty({ example: false, description: 'Is passed test' })
  @Column({ name: 'is_passed_test', type: 'boolean', default: false })
  isPassedTest: boolean;
}
