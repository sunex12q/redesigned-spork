import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';
import { PropertyCategory, ListingType } from '../entities/property.entity';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(ListingType)
  @IsOptional()
  listingType?: ListingType;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(PropertyCategory)
  category: PropertyCategory;

  @IsNumber()
  @IsOptional()
  sizeInSqm?: number;
}
