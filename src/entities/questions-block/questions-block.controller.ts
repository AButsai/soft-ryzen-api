import { JwtAuthGuard } from '@guards/jwtGuard/jwt-auth.guard';
import { Roles } from '@guards/roleGuard/decorators/role.decorator';
import { RoleGuard } from '@guards/roleGuard/role.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ERole } from '@src/enums/role.enum';
import { MyRequest } from '@src/types/request.interface';
import {
  QuestionBlockDto,
  RequestQuestionBlockDto,
} from './dto/questions-block.dto';
import { QuestionsBlockService } from './questions-block.service';

@ApiTags('Question block')
@Controller('api/questions-block')
export class QuestionsBlockController {
  constructor(private readonly questionBlockService: QuestionsBlockService) {}

  // Add block questions
  @ApiOperation({ summary: 'Add block question' })
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
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.ADMIN)
  @Post()
  async addBlock(@Body() body: QuestionBlockDto, @Req() req: MyRequest) {
    return await this.questionBlockService.addBlock(req.user.id, body);
  }

  // Update block questions by id
  @ApiOperation({ summary: 'Update block question' })
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
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.ADMIN)
  @Put(':id')
  async updateBlock(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: QuestionBlockDto,
  ) {
    return await this.questionBlockService.updateBlock(id, body);
  }

  // Get all blocks questions
  @ApiOperation({ summary: 'Get all block question by directionName' })
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
  @ApiOkResponse({ description: 'OK', type: [RequestQuestionBlockDto] })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get(':directionName')
  async getBlock(@Query('directionName') directionName: string) {
    return await this.questionBlockService.getBlock(directionName);
  }
}
