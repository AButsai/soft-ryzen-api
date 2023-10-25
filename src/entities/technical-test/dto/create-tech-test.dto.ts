import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsDateString } from 'class-validator';

export class CreateTechnicalTestDto {
  @ApiProperty({ example: 'Full Stack', description: 'Internship Stream' })
  @IsString()
  internshipStream: string;

  @ApiProperty({ example: 'Frontend', description: 'Direction' })
  @IsString()
  direction: string;

  @ApiProperty({ example: 'Test Title', description: 'Title' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Short Description',
    description: 'Short description of test',
  })
  @IsString()
  shortDescription: string;

  @ApiProperty({ example: 'Materials', description: 'Materials for test' })
  materials: string[];

  @ApiProperty({
    example: 'Acceptance Criteria',
    description: 'Acceptance Criteria',
  })
  acceptanceCriteria: string[];

  @ApiProperty({ example: 'Link', description: 'Link on repository' })
  @IsString()
  link: string;

  @ApiProperty({
    example: '25.07.2023 12:00',
    description: 'Deadline',
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
