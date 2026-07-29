import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedPropertiesService } from './saved-properties.service';
import { SavedPropertiesController } from './saved-properties.controller';
import { SavedProperty } from './entities/saved-property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavedProperty])],
  controllers: [SavedPropertiesController],
  providers: [SavedPropertiesService],
})
export class SavedPropertiesModule {}
