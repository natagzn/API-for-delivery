import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {StatusOrderInterface} from "./interfaces/statusOrder.interface";
import {CreateStatusOrderDto} from "./dto/statusOrder.dto";

@Injectable()
export class StatusOrderService {
    constructor(@InjectModel('StatusOrder') private readonly statusOrderModel: Model<StatusOrderInterface>) { }

    async getAllstatusOrder(): Promise<StatusOrderInterface[]> {
        const order = await this.statusOrderModel.find().exec();
        return order;
    }

    async getStatusOrder(statusOrderID): Promise<StatusOrderInterface> {
        const statusOrder = await this.statusOrderModel.findById(statusOrderID).exec() as StatusOrderInterface;
        return statusOrder;
    }

    async addStatusOrder(createStatusOrderDto: CreateStatusOrderDto): Promise<StatusOrderInterface> {
        try {
            const newStatusOrderID = await new this.statusOrderModel(createStatusOrderDto);
            return newStatusOrderID.save();
        }catch (e) {
            return e;
        }
    }

    async updateStatusOrder(statusOrderID, createStatusOrderDto: CreateStatusOrderDto): Promise<StatusOrderInterface> {
        const updatedStatusOrder = await this.statusOrderModel
            .findByIdAndUpdate(statusOrderID, createStatusOrderDto, { new: true }) as StatusOrderInterface;
        return updatedStatusOrder;
    }

    async deleteStatusOrder(statusOrderID): Promise<any> {
        const deletedStatusOrder = await this.statusOrderModel.findByIdAndDelete(statusOrderID);
        return deletedStatusOrder;
    }


}
