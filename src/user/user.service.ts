import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user-d-t.o';
import { Document } from 'mongoose';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async getAllUser(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async getUser(userID): Promise<User> {
        const user = await this.userModel.findById(userID).exec() as User;
        return user;
    }

    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        try {
            const newUser = await new this.userModel(createUserDTO);
            return newUser.save();
        }catch (e) {
            return e;
        }
    }

    async updateUser(studentID, createUserDTO: CreateUserDTO): Promise<User> {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(studentID, createUserDTO, { new: true }) as User;
        return updatedUser;
    }

    async deleteUser(userID): Promise<any> {
        const deletedUser = await this.userModel.findByIdAndDelete(userID);
        return deletedUser;
    }

    private readonly users = this.getAllUser();
    async findOne(email: string): Promise<User | undefined> {
        return (await this.users).find(user => user.email === email);
    }
}
