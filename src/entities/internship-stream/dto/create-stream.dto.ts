import { ApiProperty } from '@nestjs/swagger';

export class CreateStreamDto {
  @ApiProperty({ example: 'Full Stack', description: 'Internship Stream' })
  streamDirection: string;

  @ApiProperty({ example: 'true', description: 'Status internship stream' })
  isActive: boolean;

  @ApiProperty({ example: 1, description: 'Admin id' })
  ownerId: number;

  @ApiProperty({ example: 'admin', description: 'Role user`s' })
  owner: string;

  @ApiProperty({
    example: 'Start date',
    description: 'Start date of internship stream',
  })
  startDate: Date;

  @ApiProperty({
    example: 'End date',
    description: 'End date of internship stream',
  })
  endDate: Date;
}
