import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Goods} from "../goods/interfaces/goods.interfaces";
import {CreateGoodsDTO} from "../goods/dto/create-goods.dto";

@Injectable()
export class GoodsService {
    constructor(@InjectModel('Goods') private readonly goodsModel: Model<Goods>) { }

    async getAllGoods(): Promise<Goods[]> {
        const goods = await this.goodsModel.find().exec();
        return goods;
    }

    async getGoods(goodsID): Promise<Goods> {
        const goods = await this.goodsModel.findById(goodsID).exec() as Goods;
        return goods;
    }

    async addGoods(createGoodsDTO: CreateGoodsDTO): Promise<Goods> {
        try {
            const newGoods = await new this.goodsModel(createGoodsDTO);
            return newGoods.save();
        }catch (e) {
            return e;
        }
    }

    async updateGoods(goodsID, createGoodsDTO: CreateGoodsDTO): Promise<Goods> {
        const updatedGoods = await this.goodsModel
            .findByIdAndUpdate(goodsID, createGoodsDTO, { new: true }) as Goods;
        return updatedGoods;
    }

    async deleteGoods(goodsID): Promise<any> {
        const deletedGoods = await this.goodsModel.findByIdAndDelete(goodsID);
        return deletedGoods;
    }


}
