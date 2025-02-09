import { Module } from '@nestjs/common';
import { StatusDeliveryService } from './status-delivery.service';
import { StatusDeliveryController } from './status-delivery.controller';

@Module({
  providers: [StatusDeliveryService],
  controllers: [StatusDeliveryController]
})
export class StatusDeliveryModule {}
