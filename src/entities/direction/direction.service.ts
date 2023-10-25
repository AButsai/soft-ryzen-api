import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERole } from '@src/enums/role.enum';
import { Repository } from 'typeorm';
import { Direction } from './direction.entity';
import { AddDirectionDto } from './dto/add-direction.dto';

@Injectable()
export class DirectionService {
  constructor(
    @InjectRepository(Direction)
    private readonly directionRepository: Repository<Direction>,
  ) {}

  public async addDirection(id: number, body: AddDirectionDto) {
    const candidate = await this.getDirection('direction', body.direction);
    if (candidate) {
      throw new ConflictException('This direction has already been added');
    }
    const newDirection = this.directionRepository.create({
      ...body,
      ownerId: id,
      owner: ERole.ADMIN,
    });
    await this.directionRepository.save(newDirection);
    return newDirection;
  }

  public async geAllDirection() {
    return this.directionRepository.find();
  }

  public async updateDirection(id: number, body: AddDirectionDto) {
    const update = await this.directionRepository.update(id, body);
    if (update.affected === 0) {
      throw new BadRequestException();
    }
    return this.directionRepository.findOne({ where: { id } });
  }

  private async getDirection(field: string, value: string | number) {
    return await this.directionRepository.findOne({
      where: { [field]: value },
    });
  }
}
