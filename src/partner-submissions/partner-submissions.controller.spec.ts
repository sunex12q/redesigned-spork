import { Test, TestingModule } from '@nestjs/testing';
import { PartnerSubmissionsController } from './partner-submissions.controller';
import { PartnerSubmissionsService } from './partner-submissions.service';

describe('PartnerSubmissionsController', () => {
  let controller: PartnerSubmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnerSubmissionsController],
      providers: [PartnerSubmissionsService],
    }).compile();

    controller = module.get<PartnerSubmissionsController>(PartnerSubmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
