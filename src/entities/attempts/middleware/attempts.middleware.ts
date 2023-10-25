import { Injectable, NestMiddleware } from '@nestjs/common';
import { MyRequest } from '@src/types/request.interface';
import { NextFunction, Response } from 'express';
import { AttemptsService } from '../attempts.service';

@Injectable()
export class BlockIpMiddleware implements NestMiddleware {
  constructor(private readonly attemptsService: AttemptsService) {}

  async use(req: MyRequest, res: Response, next: NextFunction) {
    const blockedIp = await this.attemptsService.getIp(req.ip);
    if (blockedIp && blockedIp.blockedUntil > new Date()) {
      const remainingTime = Math.ceil(
        (blockedIp.blockedUntil.getTime() - Date.now()) / 1000,
      );
      const min = Math.floor(remainingTime / 60);
      const sec = remainingTime % 60;

      res.status(429).send({
        message: `Access denied. Please try again after ${min}:${sec
          .toString()
          .padStart(2, '0')} seconds.`,
      });
      return;
    }

    next();
  }
}
