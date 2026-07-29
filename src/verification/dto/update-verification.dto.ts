import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ReviewStatus } from '../entities/verification.entity';

export class UpdateVerificationDto {
  @IsEnum(ReviewStatus)
  @IsOptional()
  legalReviewStatus?: ReviewStatus;

  @IsEnum(ReviewStatus)
  @IsOptional()
  surveyReviewStatus?: ReviewStatus;

  @IsString()
  @IsOptional()
  notes?: string;
}
