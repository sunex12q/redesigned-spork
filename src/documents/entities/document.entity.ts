import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Property } from '../../properties/entities/property.entity';
import { User } from '../../users/entities/user.entity';

export enum DocumentType {
  TITLE_DEED = 'title_deed',
  SURVEY_REPORT = 'survey_report',
  DEED_OF_ASSIGNMENT = 'deed_of_assignment',
  GOVERNMENT_APPROVAL = 'government_approval',
  OTHER = 'other',
}

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Property)
  property: Property;

  @Column({ type: 'enum', enum: DocumentType })
  type: DocumentType;

  @Column()
  fileName: string;

  @Column()
  fileUrl: string;

  @ManyToOne(() => User)
  uploadedBy: User;

  @CreateDateColumn()
  createdAt: Date;
}
