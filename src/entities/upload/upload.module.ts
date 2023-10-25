import { UserEntity } from '@entities/users/users.entity';
import { UserModule } from '@entities/users/users.module';
import { JwtGuardsModule } from '@guards/jwtGuard/jwt-guard.module';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterConfigService } from './config/multer-config';
import { ConfigModule } from '@src/config.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    UserModule,
    JwtGuardsModule,
    ConfigModule,
  ],
  controllers: [UploadController],
  providers: [UploadService, ConfigService],
})
export class UploadModule {}
