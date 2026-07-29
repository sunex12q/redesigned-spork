import { Test, TestingModule } from '@nestjs/testing';
import { SavedPropertiesController } from './saved-properties.controller';
import { SavedPropertiesService } from './saved-properties.service';

describe('SavedPropertiesController', () => {
  let controller: SavedPropertiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedPropertiesController],
      providers: [SavedPropertiesService],
    }).compile();

    controller = module.get<SavedPropertiesController>(SavedPropertiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
