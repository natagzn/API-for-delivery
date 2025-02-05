import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Order} from "../order/interfaces/order.interface";
import {CreateOrderDTO} from "../order/dto/create-order.dto";

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) { }

    async getAllOrder(): Promise<Order[]> {
        const orders = await this.orderModel.find().exec();
        return orders;
    }

    async getOrder(orderID): Promise<Order> {
        const order = await this.orderModel.findById(orderID).exec() as Order;
        return order;
    }

    async addOrder(createOrerDTO: CreateOrderDTO): Promise<Order> {
        try {
            const newOrer = await new this.orderModel(createOrerDTO);
            return newOrer.save();
        }catch (e) {
            return e;
        }
    }

    async updateOrder(orderID, createOrderDTO: CreateOrderDTO): Promise<Order> {
        const updatedOrder = await this.orderModel
            .findByIdAndUpdate(orderID, createOrderDTO, { new: true }) as Order;
        return updatedOrder;
    }

    async deleteOrder(orderID): Promise<any> {
        const deletedOrder = await this.orderModel.findByIdAndDelete(orderID);
        return deletedOrder;
    }
}
