import { Test, TestingModule } from '@nestjs/testing';
import { StatusDeliveryService } from './status-delivery.service';

describe('StatusDeliveryService', () => {
  let service: StatusDeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusDeliveryService],
    }).compile();

    service = module.get<StatusDeliveryService>(StatusDeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
