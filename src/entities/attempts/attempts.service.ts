import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttemptsEntity } from './attempts.entity';

@Injectable()
export class AttemptsService {
  private readonly MAXIMUM_NUMBER_OF_ATTEMPTS = 5;
  constructor(
    @InjectRepository(AttemptsEntity)
    private readonly attemptRepository: Repository<AttemptsEntity>,
  ) {}

  public async getIp(userIp: string) {
    const ip = await this.attemptRepository.findOne({ where: { ip: userIp } });
    if (ip) {
      return ip;
    }
    return null;
  }

  public async attempts(userIp: string) {
    const ip = await this.attemptRepository.findOne({ where: { ip: userIp } });
    if (ip) {
      await this.updateAttempts(ip.id, ip.attempts);
      await this.processingAttempts(ip.id);
    } else {
      const newIp = this.attemptRepository.create({
        ip: userIp,
      });
      await this.attemptRepository.save(newIp);
      await this.updateAttempts(newIp.id, 0);
      await this.processingAttempts(newIp.id);
    }
  }

  async updateAttempts(id: number, att: number) {
    await this.attemptRepository.update(id, { attempts: att + 1 });
  }

  async deleteAttempts(userIp: string) {
    await this.attemptRepository.delete({ ip: userIp });
  }

  private async processingAttempts(id: number) {
    const ip = await this.attemptRepository.findOne({ where: { id } });
    if (ip.attempts >= this.MAXIMUM_NUMBER_OF_ATTEMPTS) {
      const currentDate = new Date();
      await this.attemptRepository.update(ip.id, {
        blockedUntil: new Date(currentDate.getTime() + 15 * 60 * 1000),
      });
    }
  }
}
