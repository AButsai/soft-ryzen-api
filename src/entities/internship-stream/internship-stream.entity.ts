import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('stream')
export class InternshipStream extends MyBaseEntity {
  @ApiProperty({ example: 'Full Stack', description: 'Internship Stream' })
  @Column({ name: 'internship_stream', type: 'varchar' })
  streamDirection: string;

  @ApiProperty({ example: 1, description: 'Stream number' })
  @Column({ name: 'number', type: 'integer' })
  number: number;

  @ApiProperty({ example: 'true', description: 'Status internship stream' })
  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({ example: 1, description: 'Admin id' })
  @Column({ name: 'owner_id', type: 'integer', nullable: true })
  ownerId: number;

  @ApiProperty({ example: 'admin', description: 'Role user`s' })
  @Column({ name: 'owner_role', type: 'varchar', nullable: true })
  owner: string;

  @ApiProperty({
    example: 'Start date',
    description: 'Start date of internship stream',
  })
  @Column({
    name: 'start_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  startDate: Date;

  @ApiProperty({
    example: 'End date',
    description: 'End date of internship stream',
  })
  @Column({ name: 'end_date', type: 'timestamp', nullable: true })
  endDate: Date;
}
