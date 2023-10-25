import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-guard.module';
import { RoleGuard } from '@guards/roleGuard/role.guard';
import { RoleGuardsModule } from '@guards/roleGuard/role.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectionController } from './direction.controller';
import { Direction } from './direction.entity';
import { DirectionService } from './direction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Direction]),
    JwtGuardsModule,
    RoleGuardsModule,
  ],
  controllers: [DirectionController],
  providers: [DirectionService, ConfigService, JwtAuthGuard, RoleGuard],
})
export class DirectionModule {}
