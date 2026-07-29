import { IsNumber, IsEnum, Min } from 'class-validator';
import { PaymentType } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsNumber()
  propertyId: number;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsEnum(PaymentType)
  type: PaymentType;
}
