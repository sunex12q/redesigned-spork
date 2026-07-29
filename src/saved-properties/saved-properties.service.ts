import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSavedPropertyDto } from './dto/create-saved-property.dto';
import { SavedProperty } from './entities/saved-property.entity';

@Injectable()
export class SavedPropertiesService {
  constructor(
    @InjectRepository(SavedProperty)
    private savedPropertiesRepository: Repository<SavedProperty>,
  ) {}

  async create(createSavedPropertyDto: CreateSavedPropertyDto, userId: number): Promise<SavedProperty> {
    const existing = await this.savedPropertiesRepository.findOne({
      where: {
        user: { id: userId },
        property: { id: createSavedPropertyDto.propertyId },
      },
    });

    if (existing) {
      throw new ConflictException('Property already saved.');
    }

    const newSaved = this.savedPropertiesRepository.create({
      user: { id: userId },
      property: { id: createSavedPropertyDto.propertyId },
    });
    return this.savedPropertiesRepository.save(newSaved);
  }

  findAllForUser(userId: number): Promise<SavedProperty[]> {
    return this.savedPropertiesRepository.find({
      where: { user: { id: userId } },
      relations: { property: true },
    });
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.savedPropertiesRepository.delete({ id, user: { id: userId } });
  }
}
