import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Res
} from '@nestjs/common';
import {OrderService} from "../order/order.service";
import {CreateOrderDTO} from "../order/dto/create-order.dto";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post('create')
    async addOrder(@Res() res, @Body() createOrderDTO: CreateOrderDTO) {
        try{
            const order = await this.orderService.addOrder(createOrderDTO);
            console.log(order);
            return res.status(HttpStatus.OK).json({
                message: "Order has been created successfully",
                order
            })
        }catch(err){
            console.log(err);
        }
    }

    @Get('all')
    async getAllOrder(@Res() res) {
        try{
            const orders = await this.orderService.getAllOrder();
            return res.status(HttpStatus.OK).json(orders);
        }catch(err){
            console.log(err);
        }
    }

    @Get('order/:orderID')
    async getOrder(@Res() res, @Param('orderID') orderID) {
        try{
            const order = await this.orderService.getOrder(orderID);
            if (!order) throw new NotFoundException('Order does not exist!');
            return res.status(HttpStatus.OK).json(order);
        }catch(err){
            console.log(err);
        }
    }

    @Put('/update')
    async updateOrder(@Res() res, @Query('orderID') orderID, @Body() createOrderDTO: CreateOrderDTO) {
        try{
            const order = await this.orderService.updateOrder(orderID, createOrderDTO);
            if (!order) throw new NotFoundException('order does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'order has been successfully updated',
                order
            });
        }catch(err){
            console.log(err);
        }
    }

    @Delete('/delete')
    async deleteOrder(@Res() res, @Query('orderID') orderID) {
        try{
            const order = await this.orderService.deleteOrder(orderID);
            if (!order) throw new NotFoundException('Order does not exist');
            return res.status(HttpStatus.OK).json({
                message: 'Order has been deleted',
                order
            })
        }catch(err){
            console.log(err);
        }
    }
}
