import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PartnerSubmissionsService } from './partner-submissions.service';
import { CreatePartnerSubmissionDto } from './dto/create-partner-submission.dto';
import { UpdatePartnerSubmissionDto } from './dto/update-partner-submission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('partner-submissions')
@UseGuards(JwtAuthGuard)
export class PartnerSubmissionsController {
  constructor(private readonly partnerSubmissionsService: PartnerSubmissionsService) {}

  @Post()
  create(@Body() createDto: CreatePartnerSubmissionDto, @Request() req) {
    return this.partnerSubmissionsService.create(createDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.partnerSubmissionsService.findAll();
  }

  @Get('mine')
  findMine(@Request() req) {
    return this.partnerSubmissionsService.findAllForUser(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerSubmissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePartnerSubmissionDto) {
    return this.partnerSubmissionsService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerSubmissionsService.remove(+id);
  }
}
