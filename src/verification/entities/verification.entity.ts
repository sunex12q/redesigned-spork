import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Property } from '../../properties/entities/property.entity';
import { User } from '../../users/entities/user.entity';

export enum ReviewStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Property)
  property: Property;

  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PENDING })
  legalReviewStatus: ReviewStatus;

  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PENDING })
  surveyReviewStatus: ReviewStatus;

  @Column('text', { nullable: true })
  notes: string;

  @ManyToOne(() => User, { nullable: true })
  reviewedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
