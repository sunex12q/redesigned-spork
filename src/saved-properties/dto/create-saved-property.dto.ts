import { IsNumber } from 'class-validator';

export class CreateSavedPropertyDto {
  @IsNumber()
  propertyId: number;
}
