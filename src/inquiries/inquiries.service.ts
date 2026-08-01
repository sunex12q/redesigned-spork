import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { Inquiry } from './entities/inquiry.entity';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiriesRepository: Repository<Inquiry>,
  ) {}

  create(createInquiryDto: CreateInquiryDto): Promise<Inquiry> {
    const newInquiry = this.inquiriesRepository.create({
      name: createInquiryDto.name,
      email: createInquiryDto.email,
      phoneNumber: createInquiryDto.phoneNumber,
      message: createInquiryDto.message,
      property: { id: createInquiryDto.propertyId },
    });
    return this.inquiriesRepository.save(newInquiry);
  }

  findAllForOwner(userId: number): Promise<Inquiry[]> {
    return this.inquiriesRepository
      .createQueryBuilder('inquiry')
      .leftJoinAndSelect('inquiry.property', 'property')
      .leftJoin('property.listedBy', 'listedBy')
      .where('listedBy.id = :userId', { userId })
      .orderBy('inquiry.createdAt', 'DESC')
      .getMany();
  }

  async markResponded(id: number): Promise<void> {
    await this.inquiriesRepository.update(id, { responded: true });
  }
}
