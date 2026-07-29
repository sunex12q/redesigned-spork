import { Test, TestingModule } from '@nestjs/testing';
import { SavedPropertiesService } from './saved-properties.service';

describe('SavedPropertiesService', () => {
  let service: SavedPropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedPropertiesService],
    }).compile();

    service = module.get<SavedPropertiesService>(SavedPropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
