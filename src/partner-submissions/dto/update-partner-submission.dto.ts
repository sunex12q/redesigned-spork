import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SubmissionStatus } from '../entities/partner-submission.entity';

export class UpdatePartnerSubmissionDto {
  @IsEnum(SubmissionStatus)
  @IsOptional()
  status?: SubmissionStatus;

  @IsString()
  @IsOptional()
  reviewNotes?: string;
}
