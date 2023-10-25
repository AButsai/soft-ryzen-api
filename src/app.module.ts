import { TypeOrmModule } from '@db/typeorm.config';
import { AuthModule } from '@entities/auth/auth.module';
import { InternshipStreamModule } from '@entities/internship-stream/internship-stream.module';
import { MailModule } from '@entities/mail/mail.module';
import { QuestionsModule } from '@entities/questions/questions.module';
import { TechnicalTestModule } from '@entities/technical-test/technical-test.module';
import { UserModule } from '@entities/users/users.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from './config.module';
import { AttemptsModule } from './entities/attempts/attempts.module';
import { DirectionModule } from './entities/direction/direction.module';
import { GoogleModule } from './entities/google/google.module';
import { MaterialsModule } from './entities/materials/materials.module';
import { PasswordModule } from './entities/passwords/passwords.module';
import { QuestionsBlockModule } from './entities/questions-block/questions-block.module';
import { TestResultModule } from './entities/test-result/test-result.module';
import { TestsModule } from './entities/tests/tests.module';
import { TokensModule } from './entities/tokens/tokens.module';
import { UploadModule } from './entities/upload/upload.module';
import { GlobalExceptionFilter } from './logger/global-exception-filter';
import { GlobalLoggerService } from './logger/global-logger.service';
import { CorsMiddleware } from './middlewares/cors-middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ConfigModule,
    TypeOrmModule,
    AuthModule,
    UserModule,
    MailModule,
    QuestionsModule,
    GoogleModule,
    UploadModule,
    InternshipStreamModule,
    MaterialsModule,
    QuestionsBlockModule,
    DirectionModule,
    TestsModule,
    TestResultModule,
    AttemptsModule,
    TechnicalTestModule,
    TokensModule,
    PasswordModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    GlobalLoggerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
