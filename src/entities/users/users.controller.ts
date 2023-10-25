import { LoginResponseDto } from '@entities/auth/dto/login.dto';
import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import { ResponseDashboardDto } from './dto/response-dashboard.dto';
import { UpdateDirectionDto } from './dto/update-direction.dto';
import { UserDto } from './dto/update-user.dto';
import { UserService } from './users.service';

@ApiTags('User')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Current user
  @ApiOperation({ summary: 'Current user' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token with type',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE, token-type=access_token',
    },
  })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Not authorized Invalid token type' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('current')
  public async currentUser(@Req() req: MyRequest) {
    const data = await this.userService.currentUser(req.user.email);
    return {
      refreshToken: data.refreshToken,
      accessToken: data.accessToken,
      user: data.user,
    };
  }

  // Update user
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token with type',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE, token-type=access_token',
    },
  })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  public async updateUser(@Body() body: UserDto, @Req() req: MyRequest) {
    const data = await this.userService.updateUser(req.user.email, body);
    return {
      refreshToken: data.refreshToken,
      accessToken: data.accessToken,
      user: data.user,
    };
  }

  // Update direction
  @ApiOperation({ summary: 'Update user`s direction' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token with type',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE, token-type=access_token',
    },
  })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Patch('direction')
  public async updateUserDirection(
    @Body() body: UpdateDirectionDto,
    @Req() req: MyRequest,
  ) {
    return await this.userService.updateUserDirection(req.user.email, body);
  }

  // Dashboard
  @ApiOperation({ summary: 'Dashboard' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token with type',
    required: true,
    schema: {
      type: 'string',
      format: 'Bearer YOUR_TOKEN_HERE, token-type=access_token',
    },
  })
  @ApiResponse({ status: 200, type: ResponseDashboardDto })
  @ApiUnauthorizedResponse({
    description:
      'Not authorized jwt expired || Not authorized Invalid token type',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  public async dashboard() {
    return await this.userService.dashboard();
  }
}
