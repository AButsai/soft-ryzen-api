import { Module } from '@nestjs/common';
import { TechnicalTestController } from './technical-test.controller';
import { TechnicalTestService } from './technical-test.service';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalTest } from './technical-test.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-guard.module';
import { ResultTechnicalTest } from './result-test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TechnicalTest, ResultTechnicalTest]),
    JwtGuardsModule,
  ],
  controllers: [TechnicalTestController],
  providers: [TechnicalTestService, ConfigService],
})
export class TechnicalTestModule {}
