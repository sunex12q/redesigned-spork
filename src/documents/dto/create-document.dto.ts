import { IsString, IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { DocumentType } from '../entities/document.entity';

export class CreateDocumentDto {
  @IsNumber()
  propertyId: number;

  @IsEnum(DocumentType)
  type: DocumentType;

  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  fileUrl: string;
}
