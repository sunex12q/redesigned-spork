import { IsString, IsNotEmpty, IsNumber, IsEnum, Min } from 'class-validator';
import { PropertyCategory, ListingType } from '../../properties/entities/property.entity';

export class CreatePartnerSubmissionDto {
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
  listingType: ListingType;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(PropertyCategory)
  category: PropertyCategory;
}
