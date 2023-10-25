import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'block_questions' })
export class QuestionsBlockEntity extends MyBaseEntity {
  @ApiProperty({ example: 'PM', description: 'Direction name' })
  @Column({ name: 'direction_name', type: 'varchar' })
  directionName: string;

  @ApiProperty({ example: 'HTML', description: 'Block name' })
  @Column({ name: 'block_name', type: 'varchar' })
  blockName: string;

  @ApiProperty({ example: '1', description: 'Admin`s id' })
  @Column({ name: 'owner_id', type: 'integer' })
  ownerId: number;

  @ApiProperty({ example: 'admin', description: 'User role' })
  @Column({ name: 'owner_role', type: 'varchar' })
  owner: string;
}
