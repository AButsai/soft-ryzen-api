import { ApiProperty } from '@nestjs/swagger';
import { MyBaseEntity } from '@src/base/base.entity';
import { ERole } from '@src/enums/role.enum';
import { Column, Entity, ManyToMany } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity('roles')
export class RoleEntity extends MyBaseEntity {
  @ApiProperty({ example: '[user]', description: 'User`s roles' })
  @Column({ name: 'user_role', type: 'enum', enum: ERole })
  role: ERole;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
