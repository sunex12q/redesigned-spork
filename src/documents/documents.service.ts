import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  create(createDocumentDto: CreateDocumentDto, userId: number): Promise<Document> {
    const newDocument = this.documentsRepository.create({
      type: createDocumentDto.type,
      fileName: createDocumentDto.fileName,
      fileUrl: createDocumentDto.fileUrl,
      property: { id: createDocumentDto.propertyId },
      uploadedBy: { id: userId },
    });
    return this.documentsRepository.save(newDocument);
  }

  findAll(): Promise<Document[]> {
    return this.documentsRepository.find({ relations: { property: true, uploadedBy: true } });
  }

  findOne(id: number): Promise<Document | null> {
    return this.documentsRepository.findOne({
      where: { id },
      relations: { property: true, uploadedBy: true },
    });
  }

  async update(id: number, updateDocumentDto: UpdateDocumentDto): Promise<Document | null> {
    await this.documentsRepository.update(id, updateDocumentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.documentsRepository.delete(id);
  }
}
