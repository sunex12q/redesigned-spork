import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Property } from '../../properties/entities/property.entity';

@Entity()
@Unique(['user', 'property'])
export class SavedProperty {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Property)
  property: Property;

  @CreateDateColumn()
  createdAt: Date;
}
