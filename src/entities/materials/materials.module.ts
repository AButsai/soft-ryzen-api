import { JwtGuardsModule } from '@guards/jwtGuard/jwt-guard.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialsController } from './materials.controller';
import { MaterialsEntity } from './materials.entity';
import { MaterialsService } from './materials.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialsEntity]), JwtGuardsModule],
  controllers: [MaterialsController],
  providers: [MaterialsService, ConfigService],
})
export class MaterialsModule {}
