import { Module } from '@nestjs/common';
import { TestResultController } from './test-result.controller';
import { TestsResultService } from './test-result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-guard.module';
import { ConfigService } from '@nestjs/config';
import { TestsResult } from './test-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestsResult]), JwtGuardsModule],
  controllers: [TestResultController],
  providers: [TestsResultService, ConfigService],
})
export class TestResultModule {}
