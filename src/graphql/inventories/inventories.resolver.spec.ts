import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesResolver } from './inventories.resolver';

describe('InventoriesResolver', () => {
  let resolver: InventoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoriesResolver],
    }).compile();

    resolver = module.get<InventoriesResolver>(InventoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
