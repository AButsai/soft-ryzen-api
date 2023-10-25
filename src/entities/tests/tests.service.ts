import { UserEntity } from '@entities/users/users.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './tests.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  // Add test
  async createTest(createTestDto: CreateTestDto): Promise<Test> {
    const existingTest = await this.testRepository.findOne({
      where: {
        internshipStream: createTestDto.internshipStream,
        streamNumber: createTestDto.streamNumber,
        availabilityStartDate: createTestDto.availabilityStartDate,
        availabilityEndDate: createTestDto.availabilityEndDate,
        duration: createTestDto.duration,
      },
    });

    if (existingTest) {
      throw new ConflictException(
        'Test with similar parameters already exists',
      );
    }

    const test = this.testRepository.create(createTestDto);
    const createdTest = await this.testRepository.save(test);
    return createdTest;
  }

  // Get all tests with filter
  async getTests(
    userId: number,
    internshipStream?: string,
    availabilityStartDate?: string,
  ): Promise<Test[]> {
    // const user = await this.userRepository.findOne({ where: { id: userId } });
    // if (user && user.isSentTest) {
    //   throw new ForbiddenException('You do not have access to this test');
    // }
    const filters: Record<string, any> = {};

    if (internshipStream !== undefined) {
      filters.internshipStream = internshipStream;
    }
    if (availabilityStartDate !== undefined) {
      const formattedStartDate = new Date(availabilityStartDate);
      filters.availabilityStartDate = formattedStartDate.toISOString();
    }
    const tests = await this.testRepository.find({ where: filters });
    if (tests.length === 0) {
      throw new NotFoundException('No tests found for the selected criteria');
    }

    await this.userRepository.update(userId, { isSentTest: true });
    return tests;
  }

  // Update test
  async updateTest(id: number, fieldsToUpdate: Partial<CreateTestDto>) {
    const test = await this.testRepository.findOne({ where: { id } });
    if (!test) {
      throw new NotFoundException('Test not found');
    }

    Object.assign(test, fieldsToUpdate);
    return this.testRepository.save(test);
  }
}
