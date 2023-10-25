// src/entity/test-result/test-result.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestsResult } from './test-result.entity';

@Injectable()
export class TestsResultService {
  constructor(
    @InjectRepository(TestsResult)
    private testResultRepository: Repository<TestsResult>,
  ) {}

  async getAll(
    direction?: string,
    stream?: string,
    isPassedTest?: boolean,
    sortByScore?: boolean,
  ): Promise<TestsResult[]> {
    const filters: Record<string, any> = {};

    if (direction !== undefined) {
      filters.direction = direction;
    }

    if (stream !== undefined) {
      filters.stream = stream;
    }

    if (isPassedTest !== undefined) {
      filters.isPassedTest = isPassedTest;
    }

    let query = this.testResultRepository.createQueryBuilder('testResult');

    if (Object.keys(filters).length > 0) {
      query = query.where(filters);
    }

    if (sortByScore) {
      query = query.orderBy('testResult.score', 'DESC');
    }

    return query.getMany();
  }
}
