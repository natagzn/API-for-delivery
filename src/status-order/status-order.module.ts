import { Module } from '@nestjs/common';
import { StatusOrderService } from './status-order.service';
import { StatusOrderController } from './status-order.controller';

@Module({
  providers: [StatusOrderService],
  controllers: [StatusOrderController]
})
export class StatusOrderModule {}
