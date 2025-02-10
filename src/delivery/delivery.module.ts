import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {DeliverySchema} from "../delivery/schema/delivery.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Delivery', schema: DeliverySchema }])
  ],
  providers: [DeliveryService],
  controllers: [DeliveryController],
  exports: [DeliveryService, MongooseModule],
})
export class DeliveryModule {}
