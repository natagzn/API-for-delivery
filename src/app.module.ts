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


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root1:password*@cluster36525.0es7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster36525', {}),
    UserModule,
    OrderModule
  ],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService],
})
export class AppModule {}

