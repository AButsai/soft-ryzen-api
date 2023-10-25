import { Module } from '@nestjs/common';
import { InternshipStreamService } from './internship-stream.service';
import { InternshipStreamController } from './internship-stream.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternshipStream } from './internship-stream.entity';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-guard.module';
import { ConfigService } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';

@Module({
  imports:[TypeOrmModule.forFeature([InternshipStream]), JwtGuardsModule],
  providers: [InternshipStreamService,
    ConfigService,],
  // {provide: APP_GUARD, useClass: JwtAuthGuard}],
// {provide: APP_GUARD, useClass: RoleGuard}
  controllers: [InternshipStreamController]
})
export class InternshipStreamModule {}
