import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import {UserService} from './user/user.service';
import {UserController} from "./user/user.controller";
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { DeliveryModule } from './delivery/delivery.module';
import { StatusOrderModule } from './status-order/status-order.module';
import { StatusDeliveryModule } from './status-delivery/status-delivery.module';
import { GoodsService } from './goods/goods.service';
import { GoodsController } from './goods/goods.controller';
import { GoodsModule } from './goods/goods.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root2:password*@cluster36525.0es7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster36525', {}),
    UserModule,
    OrderModule,
    AuthModule,
    DeliveryModule,
    StatusOrderModule,
    StatusDeliveryModule,
    GoodsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

