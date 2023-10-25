import { UserEntity } from '@entities/users/users.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-guard.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from './tests.controller';
import { Test } from './tests.entity';
import { TestsService } from './tests.service';

@Module({
  imports: [TypeOrmModule.forFeature([Test, UserEntity]), JwtGuardsModule],
  providers: [TestsService, ConfigService],
  controllers: [TestController],
})
export class TestsModule {}
