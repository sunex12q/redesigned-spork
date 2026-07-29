import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../properties/entities/property.entity';
import { User } from '../users/entities/user.entity';
import { Verification } from '../verification/entities/verification.entity';
import { Payment, PaymentStatus } from '../payments/entities/payment.entity';
import { PartnerSubmission, SubmissionStatus } from '../partner-submissions/entities/partner-submission.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Verification)
    private verificationRepository: Repository<Verification>,
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(PartnerSubmission)
    private submissionsRepository: Repository<PartnerSubmission>,
  ) {}

  async getStats() {
    const totalUsers = await this.usersRepository.count();
    const totalProperties = await this.propertiesRepository.count();
    const availableProperties = await this.propertiesRepository.count({
      where: { status: 'available' as any },
    });

    const pendingVerifications = await this.verificationRepository.count({
      where: { legalReviewStatus: 'pending' as any },
    });

    const completedPayments = await this.paymentsRepository.find({
      where: { status: PaymentStatus.COMPLETED },
    });
    const totalRevenue = completedPayments.reduce((sum, p) => sum + Number(p.amount), 0);

    const pendingSubmissions = await this.submissionsRepository.count({
      where: { status: SubmissionStatus.PENDING },
    });

    return {
      totalUsers,
      totalProperties,
      availableProperties,
      pendingVerifications,
      pendingSubmissions,
      totalRevenue,
      completedPaymentsCount: completedPayments.length,
    };
  }
}
