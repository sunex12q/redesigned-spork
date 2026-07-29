import { PartialType } from '@nestjs/swagger';
import { CreateSavedPropertyDto } from './create-saved-property.dto';

export class UpdateSavedPropertyDto extends PartialType(CreateSavedPropertyDto) {}
