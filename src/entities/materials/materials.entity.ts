import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('materials')
export class MaterialsEntity extends MyBaseEntity {
  @ApiProperty({ example: 'NextJS', description: 'Name material' })
  @Column({ name: 'material_name', type: 'varchar' })
  materialName: string;

  @ApiProperty({ example: 1, description: 'Direction id' })
  @Column({ name: 'direction_id', type: 'integer' })
  directionId: number;

  @ApiProperty({ example: 1, description: 'Direction id' })
  @Column({ name: 'question_block_id', type: 'integer' })
  questionBlockId: number;

  @ApiProperty({ example: ['https://nextjs.org'], description: 'Url material' })
  @Column({ name: 'material_url', type: 'text', array: true })
  materialsUrl: string[];
}
