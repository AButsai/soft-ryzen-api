import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttemptsEntity } from './attempts.entity';
import { AttemptsService } from './attempts.service';

@Module({
  imports: [TypeOrmModule.forFeature([AttemptsEntity])],
  providers: [AttemptsService],
  exports: [AttemptsService],
})
export class AttemptsModule {}
