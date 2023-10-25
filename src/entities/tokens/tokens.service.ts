import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TUser } from '@src/types/request.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async generateTokens(user: UserEntity | TUser) {
    const roles = user.roles.map((role) =>
      typeof role === 'string' ? role : role.role,
    );

    const payload = { email: user.email, id: user.id, roles };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: process.env.ACCESS_TOKEN_PRIVATE_KEY || 'SUCCESS_TOKEN',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.REFRESH_TOKEN_PRIVATE_KEY || 'REFRESH_TOKEN',
    });

    await this.userRepository.update(payload.id, { refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }
}
