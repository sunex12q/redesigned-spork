import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum PropertyStatus {
  AVAILABLE = 'available',
  UNDER_VERIFICATION = 'under_verification',
  SOLD = 'sold',
  RESERVED = 'reserved',
  RENTED = 'rented',
}

export enum PropertyCategory {
  LAND = 'land',
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  AGRICULTURAL = 'agricultural',
}

export enum ListingType {
  SALE = 'sale',
  SHORT_TERM_RENT = 'short_term_rent',
  LONG_TERM_RENT = 'long_term_rent',
}

export enum Currency {
  NGN = 'NGN',
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
}

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'enum', enum: Currency, default: Currency.NGN })
  currency: Currency;

  @Column({ type: 'enum', enum: ListingType, default: ListingType.SALE })
  listingType: ListingType;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: PropertyCategory })
  category: PropertyCategory;

  @Column({ type: 'enum', enum: PropertyStatus, default: PropertyStatus.AVAILABLE })
  status: PropertyStatus;

  @Column({ nullable: true })
  sizeInSqm: number;

  @ManyToOne(() => User)
  listedBy: User;

  @CreateDateColumn()
  createdAt: Date;
}
