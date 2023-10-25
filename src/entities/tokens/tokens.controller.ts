import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import { TokensResponseDto } from './dto/tokens.dto';
import { TokensService } from './tokens.service';

@ApiTags('Tokens')
@Controller('api/tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  // Refresh token
  @ApiOperation({ summary: 'Refresh token' })
  @ApiCookieAuth('refreshToken')
  @ApiHeader({
    name: 'Authorization',
    description: 'token-type: refresh_token',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE',
    },
  })
  @ApiOkResponse({ type: TokensResponseDto })
  @ApiNotFoundResponse({ description: 'Not found error' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('refresh-token')
  public async refresh(@Req() req: MyRequest) {
    return await this.tokensService.generateTokens(req.user);
  }
}
