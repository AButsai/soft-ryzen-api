import { JwtGuardsModule } from '@guards/jwtGuard/jwt-guard.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsBlockController } from './questions-block.controller';
import { QuestionsBlockEntity } from './questions-block.entity';
import { QuestionsBlockService } from './questions-block.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsBlockEntity]), JwtGuardsModule],
  controllers: [QuestionsBlockController],
  providers: [QuestionsBlockService, ConfigService],
})
export class QuestionsBlockModule {}
