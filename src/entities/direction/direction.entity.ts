import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity('direction')
export class Direction extends MyBaseEntity {
  @ApiProperty({ example: 'Full stack', description: 'Internship direction' })
  @Column({ name: 'internship_direction', type: 'varchar' })
  @Unique(['direction'])
  direction: string;

  @ApiProperty({
    example:
      'Development of web interfaces, using modern frameworks and tools...',
    description: 'Direction description',
    required: true,
  })
  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @ApiProperty({
    example: ['Next.js', 'Tailwind', 'React', 'JavaScript', 'TypeScript'],
    description: 'Direction technologies',
    required: true,
  })
  @Column({ name: 'technologies', type: 'text', array: true, nullable: true })
  technologies: string[];

  @ApiProperty({ example: 1, description: 'Admin id' })
  @Column({ name: 'owner_id', type: 'integer' })
  ownerId: number;

  @ApiProperty({ example: 'admin', description: 'Role user`s' })
  @Column({ name: 'owner_role', type: 'varchar' })
  owner: string;
}
