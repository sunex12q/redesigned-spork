import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
  ) {}

  create(createDto: CreatePaymentDto, userId: number): Promise<Payment> {
    const newPayment = this.paymentsRepository.create({
      amount: createDto.amount,
      type: createDto.type,
      property: { id: createDto.propertyId },
      paidBy: { id: userId },
    });
    return this.paymentsRepository.save(newPayment);
  }

  findAllForUser(userId: number): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: { paidBy: { id: userId } },
      relations: { property: true },
    });
  }

  findOne(id: number): Promise<Payment | null> {
    return this.paymentsRepository.findOne({
      where: { id },
      relations: { property: true, paidBy: true },
    });
  }

  async update(id: number, updateDto: UpdatePaymentDto): Promise<Payment | null> {
    await this.paymentsRepository.update(id, updateDto);
    return this.findOne(id);
  }
}
