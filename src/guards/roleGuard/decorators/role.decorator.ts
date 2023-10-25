import { SetMetadata } from '@nestjs/common';
import { ERole } from '../../../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ERole[]) => SetMetadata(ROLES_KEY, roles);
