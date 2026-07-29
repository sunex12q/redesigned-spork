import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto, userId: number): Promise<Property> {
    const existing = await this.propertiesRepository.findOne({
      where: {
        title: createPropertyDto.title,
        location: createPropertyDto.location,
      },
    });

    if (existing) {
      throw new ConflictException(
        'A property with this title and location has already been listed.',
      );
    }

    const newProperty = this.propertiesRepository.create({
      ...createPropertyDto,
      listedBy: { id: userId },
    });
    return this.propertiesRepository.save(newProperty);
  }

  findAll(): Promise<Property[]> {
    return this.propertiesRepository.find();
  }

  findOne(id: number): Promise<Property | null> {
    return this.propertiesRepository.findOneBy({ id });
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto): Promise<Property | null> {
    await this.propertiesRepository.update(id, updatePropertyDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.propertiesRepository.delete(id);
  }
}
