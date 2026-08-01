import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Property } from '../../properties/entities/property.entity';

@Entity()
export class Inquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Property)
  property: Property;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column('text')
  message: string;

  @Column({ default: false })
  responded: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
