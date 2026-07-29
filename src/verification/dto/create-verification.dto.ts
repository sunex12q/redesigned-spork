import { IsNumber } from 'class-validator';

export class CreateVerificationDto {
  @IsNumber()
  propertyId: number;
}
