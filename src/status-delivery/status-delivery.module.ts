import { Module } from '@nestjs/common';
import { StatusDeliveryService } from './status-delivery.service';
import { StatusDeliveryController } from './status-delivery.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {StatusDeliverySchema} from "./schema/statusDelivery.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'StatusDelivery', schema: StatusDeliverySchema }])
  ],
  providers: [StatusDeliveryService],
  controllers: [StatusDeliveryController],
  exports: [StatusDeliveryService, MongooseModule],
})
export class StatusDeliveryModule {}
