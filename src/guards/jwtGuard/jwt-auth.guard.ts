import { UserEntity } from '@entities/users/users.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MyRequest } from '@src/types/request.interface';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<MyRequest>();

    try {
      if (!req.headers.authorization) {
        throw new UnauthorizedException('Token not found');
      }
      const authHeader = req.headers?.authorization;
      const bearer = authHeader?.split(' ')[0];
      const token = authHeader?.split(' ')[1];
      if (bearer !== 'Bearer') {
        throw new UnauthorizedException('Invalid token type');
      }
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }

      const tokenType = req.headers['token-type'];
      let user: UserEntity;
      if (tokenType === 'access_token') {
        user = this.jwtService.verify(token, {
          secret: this.configService.get<string>('ACCESS_TOKEN_PRIVATE_KEY'),
        });
      } else if (tokenType === 'refresh_token') {
        user = this.jwtService.verify(token, {
          secret: this.configService.get<string>('REFRESH_TOKEN_PRIVATE_KEY'),
        });
      } else {
        throw new UnauthorizedException('Invalid token type');
      }

      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException(`Not authorized ${e.message}`);
    }
  }
}
