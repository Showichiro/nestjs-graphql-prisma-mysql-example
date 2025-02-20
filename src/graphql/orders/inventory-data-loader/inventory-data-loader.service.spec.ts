import { Test, TestingModule } from '@nestjs/testing';
import { InventoryDataLoaderService } from './inventory-data-loader.service';

describe('InventoryDataLoaderService', () => {
  let service: InventoryDataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryDataLoaderService],
    }).compile();

    service = module.get<InventoryDataLoaderService>(
      InventoryDataLoaderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
