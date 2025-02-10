import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {StatusDeliveryInterface} from "./interfaces/statusDelivery.interface";
import {CreateStatusDeliveryDto} from "./dto/statusDelivery.dto";


@Injectable()
export class StatusDeliveryService {
    constructor(@InjectModel('StatusDelivery') private readonly statusDeliveryModel: Model<StatusDeliveryInterface>) { }

    async getAllstatusDelivery(): Promise<StatusDeliveryInterface[]> {
        const delivery = await this.statusDeliveryModel.find().exec();
        return delivery;
    }

    async getStatusDelivery(statusDeliveryID): Promise<StatusDeliveryInterface> {
        const statusDelivery = await this.statusDeliveryModel.findById(statusDeliveryID).exec() as StatusDeliveryInterface;
        return statusDelivery;
    }

    async addStatusDelivery(createStatusDeliveryDto: CreateStatusDeliveryDto): Promise<StatusDeliveryInterface> {
        try {
            const newStatusDelivery = await new this.statusDeliveryModel(createStatusDeliveryDto);
            return newStatusDelivery.save();
        }catch (e) {
            return e;
        }
    }

    async updateStatusDelivery(studentID, createStatusDeliveryDto: CreateStatusDeliveryDto): Promise<StatusDeliveryInterface> {
        const updatedStatusDelivery = await this.statusDeliveryModel
            .findByIdAndUpdate(studentID, createStatusDeliveryDto, { new: true }) as StatusDeliveryInterface;
        return updatedStatusDelivery;
    }

    async deleteStatusDelivery(deliveryID): Promise<any> {
        const deletedStatusDelivery = await this.statusDeliveryModel.findByIdAndDelete(deliveryID);
        return deletedStatusDelivery;
    }


}
