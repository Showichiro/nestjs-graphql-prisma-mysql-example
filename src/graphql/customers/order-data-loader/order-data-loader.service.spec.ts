import { Test, TestingModule } from '@nestjs/testing';
import { OrderDataLoaderService } from './order-data-loader.service';

describe('OrderDataLoaderService', () => {
  let service: OrderDataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDataLoaderService],
    }).compile();

    service = module.get<OrderDataLoaderService>(OrderDataLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
