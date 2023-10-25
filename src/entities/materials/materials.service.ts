import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialsDto } from './dto/materials.dto';
import { MaterialsEntity } from './materials.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(MaterialsEntity)
    private readonly materialRepository: Repository<MaterialsEntity>,
  ) {}

  // Add materials
  public async addMaterials(body: MaterialsDto) {
    const material = await this.materialRepository.findOne({
      where: {
        materialName: body.materialName,
      },
    });
    if (material) {
      throw new ConflictException(
        'The material with the same name is already in the database. Maybe you want to upgrade?',
      );
    }
    const newMaterials = this.materialRepository.create(body);
    await this.materialRepository.save(newMaterials);
    return newMaterials;
  }

  // Update materials by id
  public async updateMaterials(id: number, body: MaterialsDto) {
    const material = await this.materialRepository.findOne({ where: { id } });
    if (!material) {
      throw new NotFoundException();
    }
    this.materialRepository.merge(material, body);
    const updateMaterial = await this.materialRepository.save(material);
    return updateMaterial;
  }

  // Get all materials
  public async getAllMaterials() {
    return await this.materialRepository.find();
  }

  // Delete materials by id
  public async deleteMaterials(id: number) {
    const material = this.materialRepository.findOne({ where: { id } });
    if (!material) {
      throw new NotFoundException();
    }
    await this.materialRepository.delete(id);
    return material;
  }
}
