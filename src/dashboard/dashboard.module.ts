import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Property } from '../properties/entities/property.entity';
import { User } from '../users/entities/user.entity';
import { Verification } from '../verification/entities/verification.entity';
import { Payment } from '../payments/entities/payment.entity';
import { PartnerSubmission } from '../partner-submissions/entities/partner-submission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, User, Verification, Payment, PartnerSubmission]),
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
