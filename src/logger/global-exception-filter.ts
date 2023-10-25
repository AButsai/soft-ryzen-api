import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { GlobalLoggerService } from './global-logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: GlobalLoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage =
      exception instanceof HttpException ? exception.getResponse() : null;

    if (errorMessage && typeof errorMessage === 'object') {
      errorMessage = {
        ...errorMessage,
        statusCode: status,
      };

      this.logger.log(
        `Received request: ${ctx.getRequest().method} ${
          ctx.getRequest().originalUrl
        } ${ctx.getRequest().ip}`,
      );
      this.logger.log(
        `Request payload: ${JSON.stringify(ctx.getRequest().body)}`,
      );
    } else {
      errorMessage = { statusCode: status, message: 'Internal Server Error' };
    }

    this.logger.error(
      (errorMessage as { message: string }).message || 'Internal Server Error',
      exception.stack,
      'GlobalExceptionFilter',
    );

    response.status(status).json(
      errorMessage || {
        statusCode: status,
        message: 'Internal Server Error',
      },
    );
  }
}
