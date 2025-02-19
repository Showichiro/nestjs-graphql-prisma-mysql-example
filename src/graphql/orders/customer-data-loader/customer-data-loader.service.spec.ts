import { Test, TestingModule } from '@nestjs/testing';
import { CustomerDataLoaderService } from './customer-data-loader.service';

describe('CustomerDataLoaderService', () => {
  let service: CustomerDataLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerDataLoaderService],
    }).compile();

    service = module.get<CustomerDataLoaderService>(CustomerDataLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
