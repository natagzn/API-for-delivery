import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {DeliveryInterface} from "./interfaces/delivery.interface";
import {CreateDeliveryDto} from "../delivery/dto/create-delivery.dto";

@Injectable()
export class DeliveryService {
    constructor(@InjectModel('Delivery') private readonly deliveryModel: Model<DeliveryInterface>) { }

    async getAllDelivery(): Promise<DeliveryInterface[]> {
        const delivery = await this.deliveryModel.find().exec();
        return delivery;
    }

    async getDelivery(deliveryID): Promise<DeliveryInterface> {
        const delivery = await this.deliveryModel.findById(deliveryID).exec() as DeliveryInterface;
        return delivery;
    }

    async addDelivery(createDeliveryDTO: CreateDeliveryDto): Promise<DeliveryInterface> {
        try {
            const delivery = await new this.deliveryModel(createDeliveryDTO);
            return delivery.save();
        }catch (e) {
            return e;
        }
    }

    async updateDelivery(deliveryID, createDeliveryDTO: CreateDeliveryDto): Promise<DeliveryInterface> {
        const updatedDelivery = await this.deliveryModel
            .findByIdAndUpdate(deliveryID, createDeliveryDTO, { new: true }) as DeliveryInterface;
        return updatedDelivery;
    }

    async deleteUser(deliveryID): Promise<any> {
        const deletedDelivery = await this.deliveryModel.findByIdAndDelete(deliveryID);
        return deletedDelivery;
    }
}
