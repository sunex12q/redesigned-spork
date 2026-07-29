import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { Verification } from './entities/verification.entity';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private verificationRepository: Repository<Verification>,
  ) {}

  create(createVerificationDto: CreateVerificationDto): Promise<Verification> {
    const newVerification = this.verificationRepository.create({
      property: { id: createVerificationDto.propertyId },
    });
    return this.verificationRepository.save(newVerification);
  }

  findAll(): Promise<Verification[]> {
    return this.verificationRepository.find({ relations: { property: true } });
  }

  findOne(id: number): Promise<Verification | null> {
    return this.verificationRepository.findOne({
      where: { id },
      relations: { property: true },
    });
  }

  async update(id: number, updateVerificationDto: UpdateVerificationDto): Promise<Verification | null> {
    await this.verificationRepository.update(id, updateVerificationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.verificationRepository.delete(id);
  }
}
