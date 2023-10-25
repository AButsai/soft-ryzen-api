import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionBlockDto } from './dto/questions-block.dto';
import { QuestionsBlockEntity } from './questions-block.entity';

@Injectable()
export class QuestionsBlockService {
  constructor(
    @InjectRepository(QuestionsBlockEntity)
    private readonly questionBlockRepository: Repository<QuestionsBlockEntity>,
  ) {}

  // Add block questions
  public async addBlock(id: number, body: QuestionBlockDto) {
    const newBlock = this.questionBlockRepository.create({
      ...body,
      ownerId: id,
      owner: 'admin',
    });

    await this.questionBlockRepository.save(newBlock);
    return newBlock;
  }

  // Update block questions by id
  public async updateBlock(id: number, body: QuestionBlockDto) {
    const block = await this.questionBlockRepository.findOne({ where: { id } });
    if (block) {
      this.questionBlockRepository.merge(block, body);
      const updateBlock = await this.questionBlockRepository.save(block);
      return updateBlock;
    }
    return null;
  }

  // Get all blocks questions
  public async getBlock(directionName: string) {
    return await this.questionBlockRepository.find({
      where: { directionName },
    });
  }
}
