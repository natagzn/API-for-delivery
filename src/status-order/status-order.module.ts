import { Module } from '@nestjs/common';
import { StatusOrderService } from './status-order.service';
import { StatusOrderController } from './status-order.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {StatusOrderSchema} from "./schema/statusOrder.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'StatusOrder', schema: StatusOrderSchema }])
  ],
  providers: [StatusOrderService],
  controllers: [StatusOrderController],
  exports: [StatusOrderService, MongooseModule]
})
export class StatusOrderModule {}
