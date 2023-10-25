import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import { Transform } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity()
export class TechnicalTest extends MyBaseEntity {
  @ApiProperty({ example: 'Internship 5', description: 'Internship Stream' })
  @Column({ name: 'internship_stream', type: 'varchar' })
  internshipStream: string;

  @ApiProperty({ example: 'Frontend', description: 'Direction' })
  @Column({ name: 'direction', type: 'varchar' })
  direction: string;

  @ApiProperty({ example: 'Test Title', description: 'Title' })
  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @ApiProperty({
    example: 'Short Description',
    description: 'Short description of test',
  })
  @Column({ name: 'short-description', type: 'varchar' })
  shortDescription: string;

  @ApiProperty({ example: 'Materials', description: 'Materials for test' })
  @Column({ name: 'materials', type: 'text', array: true })
  materials: string[];

  @ApiProperty({
    example: 'Acceptance Criteria',
    description: 'Acceptance Criteria',
  })
  @Column({ name: 'acceptance-criteria', type: 'text', array: true })
  acceptanceCriteria: string[];

  @ApiProperty({ example: 'Link', description: 'Link on repository' })
  @Column({ name: 'link', type: 'varchar' })
  link: string;

  @ApiProperty({
    example: '25.07.2023 12:00',
    description: 'Deadline',
  })
  @Column({
    name: 'deadline',
    type: 'timestamp',
    nullable: true,
  })
  @Transform(
    ({ value }) =>
      value.toLocaleString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    { toPlainOnly: true },
  )
  deadline: Date;
}
