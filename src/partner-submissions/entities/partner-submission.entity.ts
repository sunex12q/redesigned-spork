import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';
import { PropertyCategory, ListingType } from '../../properties/entities/property.entity';

export enum SubmissionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class PartnerSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  submittedBy: User;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'enum', enum: ListingType })
  listingType: ListingType;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: PropertyCategory })
  category: PropertyCategory;

  @Column({ type: 'enum', enum: SubmissionStatus, default: SubmissionStatus.PENDING })
  status: SubmissionStatus;

  @Column('text', { nullable: true })
  reviewNotes: string;

  @ManyToOne(() => Property, { nullable: true })
  resultingProperty: Property;

  @CreateDateColumn()
  createdAt: Date;
}
