import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    private cloudinaryService: CloudinaryService,
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
    return this.propertiesRepository.find({ relations: { listedBy: true } });
  }

  findOne(id: number): Promise<Property | null> {
    return this.propertiesRepository.findOne({
      where: { id },
      relations: { listedBy: true },
    });
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto): Promise<Property | null> {
    await this.propertiesRepository.update(id, updatePropertyDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.propertiesRepository.delete(id);
  }

  async uploadImage(id: number, file: Express.Multer.File): Promise<Property> {
    const property = await this.findOne(id);
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    property.imageUrls = [...property.imageUrls, imageUrl];
    return this.propertiesRepository.save(property);
  }
}
