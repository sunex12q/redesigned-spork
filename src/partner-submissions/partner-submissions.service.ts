import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePartnerSubmissionDto } from './dto/create-partner-submission.dto';
import { UpdatePartnerSubmissionDto } from './dto/update-partner-submission.dto';
import { PartnerSubmission, SubmissionStatus } from './entities/partner-submission.entity';
import { Property, PropertyStatus } from '../properties/entities/property.entity';

@Injectable()
export class PartnerSubmissionsService {
  constructor(
    @InjectRepository(PartnerSubmission)
    private submissionsRepository: Repository<PartnerSubmission>,
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  create(createDto: CreatePartnerSubmissionDto, userId: number): Promise<PartnerSubmission> {
    const newSubmission = this.submissionsRepository.create({
      ...createDto,
      submittedBy: { id: userId },
    });
    return this.submissionsRepository.save(newSubmission);
  }

  findAll(): Promise<PartnerSubmission[]> {
    return this.submissionsRepository.find({
      relations: { submittedBy: true, resultingProperty: true },
    });
  }

  findAllForUser(userId: number): Promise<PartnerSubmission[]> {
    return this.submissionsRepository.find({
      where: { submittedBy: { id: userId } },
      relations: { resultingProperty: true },
    });
  }

  findOne(id: number): Promise<PartnerSubmission | null> {
    return this.submissionsRepository.findOne({
      where: { id },
      relations: { submittedBy: true, resultingProperty: true },
    });
  }

  async update(id: number, updateDto: UpdatePartnerSubmissionDto): Promise<PartnerSubmission | null> {
    const submission = await this.submissionsRepository.findOne({ where: { id } });
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    if (updateDto.status === SubmissionStatus.APPROVED && submission.status !== SubmissionStatus.APPROVED) {
      const newProperty = this.propertiesRepository.create({
        title: submission.title,
        description: submission.description,
        price: submission.price,
        listingType: submission.listingType,
        location: submission.location,
        category: submission.category,
        status: PropertyStatus.AVAILABLE,
        listedBy: submission.submittedBy,
      });
      const savedProperty = await this.propertiesRepository.save(newProperty);

      await this.submissionsRepository.update(id, {
        ...updateDto,
        resultingProperty: savedProperty,
      });
    } else {
      await this.submissionsRepository.update(id, updateDto);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.submissionsRepository.delete(id);
  }
}
