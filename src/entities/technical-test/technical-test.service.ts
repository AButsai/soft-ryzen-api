import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TechnicalTest } from './technical-test.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTechnicalTestDto } from './dto/create-tech-test.dto';
import { UpdateTechnicalTestDto } from './dto/update-tech-test.dto';
import { ResultTechnicalTest } from './result-test.entity';

@Injectable()
export class TechnicalTestService {
  constructor(
    @InjectRepository(TechnicalTest)
    private readonly questionRepository: Repository<TechnicalTest>,
    @InjectRepository(ResultTechnicalTest)
    private readonly resultRepository: Repository<ResultTechnicalTest>,
  ) {}

  // Get techical task
  async getTechnicalTaskByDirection(
    direction?: string,
  ): Promise<TechnicalTest[]> {
    if (direction) {
      return this.questionRepository.find({ where: { direction } });
    } else {
      return this.questionRepository.find();
    }
  }

  // Add new technical test
  async addTechnicalTest(
    createTechnicalTestDto: CreateTechnicalTestDto,
  ): Promise<TechnicalTest> {
    const newTechnicalTest = this.questionRepository.create(
      createTechnicalTestDto,
    );
    return this.questionRepository.save(newTechnicalTest);
  }

  // Update an technical test
  async updateTechnicalTest(
    id: number,
    updateTechnicalTestDto: UpdateTechnicalTestDto,
  ): Promise<TechnicalTest> {
    const technicalTest = await this.questionRepository.findOne({
      where: { id },
    });

    if (!technicalTest) {
      throw new NotFoundException('Technical test not found');
    }

    const updatedTechnicalTest = this.questionRepository.merge(
      technicalTest,
      updateTechnicalTestDto,
    );
    return this.questionRepository.save(updatedTechnicalTest);
  }

  // Add result for a technical test
  async addResultTechnicalTest(
    resultData: ResultTechnicalTest,
  ): Promise<ResultTechnicalTest> {
    // const existingResult = await this.resultRepository.findOne({
    //   where: {
    //     userId: resultData.userId,
    //     livePageLink: resultData.livePageLink,
    //     repositoryLink: resultData.repositoryLink,
    //   },
    // });

    // if (existingResult) {
    //   throw new ConflictException(
    //     'Result with similar parameters already exists',
    //   );
    // }

    return this.resultRepository.save(resultData);
  }

  // Get all test results
  async getAllTestResults(): Promise<ResultTechnicalTest[]> {
    return this.resultRepository.find();
  }

  // Get technical test results by user ID
  async getTechnicalTestResultsByUserId(
    userId: number,
  ): Promise<ResultTechnicalTest[]> {
    return this.resultRepository.find({
      where: {
        userId: userId,
      },
    });
  }
}
