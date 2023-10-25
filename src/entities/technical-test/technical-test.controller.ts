import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import { RoleGuard } from '@guards/roleGuard/role.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MyRequest } from '@src/types/request.interface';
import { CreateTechnicalTestDto } from './dto/create-tech-test.dto';
import { UpdateTechnicalTestDto } from './dto/update-tech-test.dto';
import { ResultTechnicalTest } from './result-test.entity';
import { TechnicalTest } from './technical-test.entity';
import { TechnicalTestService } from './technical-test.service';

@ApiTags('Technical tests')
@Controller('api/technical-test')
export class TechnicalTestController {
  constructor(private readonly technicalTestService: TechnicalTestService) {}

  // Get technical test
  @ApiOperation({ summary: 'Get technical test by direction' })
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
  @ApiOkResponse({ description: 'OK', type: TechnicalTest })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @ApiQuery({ name: 'direction', required: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getTechnicalTaskByDirection(
    @Req() req: MyRequest,
    @Query('direction') direction: string,
  ): Promise<TechnicalTest[]> {
    return this.technicalTestService.getTechnicalTaskByDirection(direction);
  }

  // Add technical test
  @ApiOperation({ summary: 'Add new technical test' })
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
  @ApiBody({ type: CreateTechnicalTestDto })
  @ApiCreatedResponse({ description: 'Created', type: TechnicalTest })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  //   @Roles(ERole.ADMIN)
  @Post()
  async addTechnicalTest(
    @Body() createTechnicalTestDto: CreateTechnicalTestDto,
  ): Promise<TechnicalTest> {
    return this.technicalTestService.addTechnicalTest(createTechnicalTestDto);
  }

  // Update technical test
  @ApiOperation({ summary: 'Update technical test by ID' })
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
  @ApiOkResponse({ description: 'OK', type: TechnicalTest })
  @ApiNotFoundResponse({ description: 'Technical test not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  //   @Roles(ERole.ADMIN)
  @Patch(':id')
  async updateTechnicalTest(
    @Param('id') id: number,
    @Body() updateTechnicalTestDto: UpdateTechnicalTestDto,
  ): Promise<TechnicalTest> {
    return this.technicalTestService.updateTechnicalTest(
      id,
      updateTechnicalTestDto,
    );
  }

  // Add technical test result
  @ApiOperation({ summary: 'Add technical test result' })
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
  @ApiBody({ type: ResultTechnicalTest })
  @ApiCreatedResponse({ description: 'Created', type: ResultTechnicalTest })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Post('result')
  async addResultTechnicalTest(
    @Body() resultData: ResultTechnicalTest,
    @Req() req: MyRequest,
  ): Promise<ResultTechnicalTest> {
    const userId = req.user.id;
    resultData.userId = userId;
    return this.technicalTestService.addResultTechnicalTest(resultData);
  }

  // Get all test results
  @ApiOperation({ summary: 'Get all technical test results' })
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
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('results')
  async getAllTestResults(): Promise<ResultTechnicalTest[]> {
    return this.technicalTestService.getAllTestResults();
  }

  // Get technical test results by user ID
  @ApiOperation({ summary: 'Get technical test results by user id' })
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
  @ApiOkResponse({
    description: 'OK',
    type: ResultTechnicalTest,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('results/user/:userId')
  async getTechnicalTestResultsByUserId(
    @Param('userId') userId: number,
  ): Promise<ResultTechnicalTest[]> {
    return this.technicalTestService.getTechnicalTestResultsByUserId(userId);
  }
}
