// src/entity/test-result/test-result.controller.ts
import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import { Roles } from '@guards/roleGuard/decorators/role.decorator';
import { RoleGuard } from '@guards/roleGuard/role.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ERole } from '@src/enums/role.enum';
import { TestsResult } from './test-result.entity';
import { TestsResultService } from './test-result.service';

@ApiTags('Tests result')
@Controller('api/test-results')
export class TestResultController {
  constructor(private readonly testsResultService: TestsResultService) {}

  // Get all results
  @ApiOperation({ summary: 'Get all result with filters ' })
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
  @ApiOkResponse({ description: 'OK' })
  @ApiConflictResponse({ description: 'This direction has already been added' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @ApiQuery({ name: 'direction', required: false })
  @ApiQuery({ name: 'number', required: false })
  @ApiQuery({ name: 'isPassedTest', required: false, type: Boolean })
  @ApiQuery({ name: 'score', required: false, type: Boolean })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.ADMIN)
  @Get()
  async getAll(
    @Query('direction') direction: string,
    @Query('stream') number: string,
    @Query('passed') isPassedTest: boolean,
    @Query('sortByScore') score: boolean,
  ): Promise<TestsResult[]> {
    return this.testsResultService.getAll(
      direction,
      number,
      isPassedTest,
      score,
    );
  }
}
