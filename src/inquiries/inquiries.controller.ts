import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  create(@Body() createInquiryDto: CreateInquiryDto) {
    return this.inquiriesService.create(createInquiryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  findMine(@Request() req) {
    return this.inquiriesService.findAllForOwner(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/respond')
  markResponded(@Param('id') id: string) {
    return this.inquiriesService.markResponded(+id);
  }
}
