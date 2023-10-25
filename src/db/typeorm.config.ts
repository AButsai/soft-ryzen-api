import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config.module';

@Module({
  imports: [
    ConfigModule,
    NestTypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      extra: {
        ssl: !(process.env.NODE_ENV === 'development'),
        rejectUnauthorized: false,
      },
      entities: ['dist/entities/**/*.entity.js'],
      migrations: ['dist/db/migrations/**/*.js'],
      synchronize: process.env.NODE_ENV === 'development',
    }),
  ],
})
export class TypeOrmModule {}
