import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum PropertyStatus {
  AVAILABLE = 'available',
  UNDER_VERIFICATION = 'under_verification',
  SOLD = 'sold',
  RESERVED = 'reserved',
}

export enum PropertyCategory {
  LAND = 'land',
  RESIDENTIAL = 'residential',
  COMMERCIAL = 'commercial',
  AGRICULTURAL = 'agricultural',
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
