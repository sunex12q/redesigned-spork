import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { SavedPropertiesService } from './saved-properties.service';
import { CreateSavedPropertyDto } from './dto/create-saved-property.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('saved-properties')
@UseGuards(JwtAuthGuard)
export class SavedPropertiesController {
  constructor(private readonly savedPropertiesService: SavedPropertiesService) {}

  @Post()
  create(@Body() createSavedPropertyDto: CreateSavedPropertyDto, @Request() req) {
    return this.savedPropertiesService.create(createSavedPropertyDto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.savedPropertiesService.findAllForUser(req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.savedPropertiesService.remove(+id, req.user.userId);
  }
}
