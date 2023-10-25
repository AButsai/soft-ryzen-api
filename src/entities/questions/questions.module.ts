import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Question } from './question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-guard.module';
import { ConfigService } from '@nestjs/config';

@Module({
   imports:[TypeOrmModule.forFeature([Question]), JwtGuardsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, ConfigService]
})
export class QuestionsModule {}
