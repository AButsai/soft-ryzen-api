import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateTechnicalTestDto {
  @ApiProperty({ example: 'Full Stack', description: 'Internship Stream' })
  @IsOptional()
  @IsString()
  internshipStream?: string;

  @ApiProperty({ example: 'Frontend', description: 'Direction' })
  @IsOptional()
  @IsString()
  direction?: string;

  @ApiProperty({ example: 'Test Title', description: 'Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example: 'Short Description',
    description: 'Short description of test',
  })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiProperty({ example: 'Materials', description: 'Materials for test' })
  @IsOptional()
  // @IsString()
  materials?: string[];

  @ApiProperty({
    example: 'Acceptance Criteria',
    description: 'Acceptance Criteria',
  })
  @IsOptional()
  // @IsString()
  acceptanceCriteria?: string[];

  @ApiProperty({ example: 'Link', description: 'Link on repository' })
  @IsOptional()
  @IsString()
  link?: string;

  @ApiProperty({ example: '2023-12-31', description: 'Deadline' })
  @IsOptional()
  @IsDate()
  deadline?: Date;
}
