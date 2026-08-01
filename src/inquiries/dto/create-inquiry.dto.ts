import { IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreateInquiryDto {
  @IsNumber()
  propertyId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
