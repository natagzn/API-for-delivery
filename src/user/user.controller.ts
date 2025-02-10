import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Post,
    Body,
    Put,
    Query,
    NotFoundException,
    Delete,
    Param,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user-d-t.o';
import {Roles} from "../auth/roles.decorator";
import { AuthGuard } from '../auth/auth.guard';
import {RolesGuard} from "../auth/roles.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 200, description: 'User successfully created' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiBearerAuth()
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

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Get('all')
    //@UseGuards(AuthGuard, RolesGuard)
    @Roles(['admin'])
    async getAllUser(@Res() res) {
        try{
            const users = await this.userService.getAllUser();
            return res.status(HttpStatus.OK).json(users);
        }catch(err){
            console.log(err);
        }
    }

    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiParam({ name: 'userID', type: 'string', description: 'User ID' })
    @ApiBearerAuth()
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

    @ApiOperation({ summary: 'Update a user' })
    @ApiResponse({ status: 200, description: 'User successfully updated' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiQuery({ name: 'userID', type: 'string', description: 'User ID' })
    @ApiBearerAuth()
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

    @ApiOperation({ summary: 'Delete a user' })
    @ApiResponse({ status: 200, description: 'User successfully deleted' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiQuery({ name: 'userID', type: 'string', description: 'User ID' })
    @ApiBearerAuth()
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID) {
        try{
            console.log(userID);
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
