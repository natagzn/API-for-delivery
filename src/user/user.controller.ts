import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('create')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        try{
            const user = await this.userService.addUser(createUserDTO);
            console.log(user);
            return res.status(HttpStatus.OK).json({
                message: "User has been created successfully",
                user
            })
        }catch(err){
            console.log(err);
        }
    }

    @Get('all')
    async getAllUser(@Res() res) {
        try{
            const users = await this.userService.getAllUser();
            return res.status(HttpStatus.OK).json(users);
        }catch(err){
            console.log(err);
        }
    }

    @Get('user/:userID')
    async getUser(@Res() res, @Param('userID') userID) {
        try{
            const user = await this.userService.getUser(userID);
            if (!user) throw new NotFoundException('User does not exist!');
            return res.status(HttpStatus.OK).json(user);
        }catch(err){
            console.log(err);
        }
    }

    @Put('/update')
    async updateUser(@Res() res, @Query('userID') userID, @Body() createUserDTO: CreateUserDTO) {
        try{
            const user = await this.userService.updateUser(userID, createUserDTO);
            if (!user) throw new NotFoundException('User does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'User has been successfully updated',
                user
            });
        }catch(err){
            console.log(err);
        }
    }

    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID) {
        try{
            const user = await this.userService.deleteUser(userID);
            if (!user) throw new NotFoundException('User does not exist');
            return res.status(HttpStatus.OK).json({
                message: 'User has been deleted',
                user
            })
        }catch(err){
            console.log(err);
        }
    }
}
