import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerSubmissionsService } from './partner-submissions.service';
import { PartnerSubmissionsController } from './partner-submissions.controller';
import { PartnerSubmission } from './entities/partner-submission.entity';
import { Property } from '../properties/entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerSubmission, Property])],
  controllers: [PartnerSubmissionsController],
  providers: [PartnerSubmissionsService],
})
export class PartnerSubmissionsModule {}
