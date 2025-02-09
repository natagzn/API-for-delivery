import { Test, TestingModule } from '@nestjs/testing';
import { StatusDeliveryController } from './status-delivery.controller';

describe('StatusDeliveryController', () => {
  let controller: StatusDeliveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusDeliveryController],
    }).compile();

    controller = module.get<StatusDeliveryController>(StatusDeliveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
