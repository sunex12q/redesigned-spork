import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto, @Request() req) {
    return this.propertiesService.create(createPropertyDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.propertiesService.uploadImage(+id, file);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/upload-video')
  @UseInterceptors(FileInterceptor('file'))
  uploadVideo(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.propertiesService.uploadVideo(+id, file);
  }
}
