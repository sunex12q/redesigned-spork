import { Test, TestingModule } from '@nestjs/testing';
import { PartnerSubmissionsService } from './partner-submissions.service';

describe('PartnerSubmissionsService', () => {
  let service: PartnerSubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerSubmissionsService],
    }).compile();

    service = module.get<PartnerSubmissionsService>(PartnerSubmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
