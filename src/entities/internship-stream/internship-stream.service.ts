import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternshipStream } from './internship-stream.entity';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';

@Injectable()
export class InternshipStreamService {
  constructor(
    @InjectRepository(InternshipStream)
    private readonly internshipStreamRepository: Repository<InternshipStream>,
  ) {}

  async createInternshipStream(
    previousStream: CreateStreamDto,
  ): Promise<InternshipStream> {
    if (!previousStream.streamDirection) {
      throw new BadRequestException('Stream is required');
    }

    const lastStream = await this.internshipStreamRepository.findOne({
      where: { streamDirection: previousStream.streamDirection },
      order: { number: 'DESC' },
    });

    const newStream = this.internshipStreamRepository.create({
      streamDirection: previousStream.streamDirection,
      owner: previousStream.owner,
      ownerId: previousStream.ownerId,
      number: lastStream ? lastStream.number + 1 : 1,
      isActive: true,
      startDate: new Date(),
      endDate: null,
    });

    const createdStream = await this.internshipStreamRepository.save(newStream);
    return createdStream;
  }

  async getInternshipStreams(
    number?: number,
    isActive?: boolean,
    streamDirection?: string,
    startDate?: string,
  ): Promise<InternshipStream[]> {
    const filters: Record<string, any> = {};

    if (number !== undefined) {
      filters.number = number;
    }
    if (isActive !== undefined) {
      filters.isActive = isActive;
    }
    if (streamDirection !== undefined) {
      filters.streamDirection = streamDirection;
    }
    if (startDate !== undefined) {
      filters.startDate = startDate;
    }

    return this.internshipStreamRepository.find({ where: filters });
  }

  async updateInternshipStreamFields(
    id: number,
    fieldsToUpdate: Partial<UpdateStreamDto>,
  ): Promise<InternshipStream> {
    const stream = await this.internshipStreamRepository.findOne({
      where: { id },
    });
    if (!stream) {
      throw new NotFoundException('Internship stream not found');
    }

    Object.assign(stream, fieldsToUpdate);

    return this.internshipStreamRepository.save(stream);
  }

  async getActiveInternshipStreams(): Promise<InternshipStream[]> {
    return this.internshipStreamRepository.find({ where: { isActive: true } });
  }
}
