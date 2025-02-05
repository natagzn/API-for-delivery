import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { Document } from 'mongoose';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<Order>) { }

    async getAllUser(): Promise<Order[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getUser(userID): Promise<Order> {
        const user = await this.userModel.findById(userID).exec() as Order;
        return user;
    }

    async addUser(createUserDTO: CreateUserDTO): Promise<Order> {
        try {
            const newUser = await new this.userModel(createUserDTO);
            return newUser.save();
        }catch (e) {
            return e;
        }
    }

    async updateUser(studentID, createUserDTO: CreateUserDTO): Promise<Order> {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(studentID, createUserDTO, { new: true }) as Order;
        return updatedUser;
    }

    async deleteUser(userID): Promise<any> {
        const deletedUser = await this.userModel.findByIdAndDelete(userID);
        return deletedUser;
    }
}
