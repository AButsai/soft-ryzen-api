import { Module } from '@nestjs/common';
import { RoleGuard } from './role.guard';

@Module({
  providers: [RoleGuard],
  exports: [RoleGuard],
})
export class RoleGuardsModule {}
