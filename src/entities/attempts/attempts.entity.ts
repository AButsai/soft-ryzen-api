import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('attempts')
export class AttemptsEntity extends MyBaseEntity {
  @ApiProperty({ example: '0.0.0.0:/0', description: 'User`s ip' })
  @Column({ name: 'user_ip', type: 'varchar', nullable: true })
  ip: string;

  @ApiProperty({ example: '', description: 'User`s blocked until' })
  @Column({ name: 'blocked_until', type: 'timestamp', nullable: true })
  blockedUntil: Date;

  @ApiProperty({
    example: 0,
    description: 'Login attempts with incorrect password',
  })
  @Column({ name: 'attempts', type: 'integer', default: 0 })
  attempts: number;
}
