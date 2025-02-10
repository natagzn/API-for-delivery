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
import {ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery, ApiBearerAuth} from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 200, description: 'Order created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBearerAuth()
    @ApiBody({ type: CreateOrderDTO })
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

    @ApiOperation({ summary: 'Get all orders' })
    @ApiResponse({ status: 200, description: 'List of all orders' })
    @ApiBearerAuth()
    @Get('all')
    async getAllOrder(@Res() res) {
        try{
            const orders = await this.orderService.getAllOrder();
            return res.status(HttpStatus.OK).json(orders);
        }catch(err){
            console.log(err);
        }
    }

    @ApiOperation({ summary: 'Get order by ID' })
    @ApiResponse({ status: 200, description: 'Order found' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    @ApiParam({ name: 'orderID', description: 'The ID of the order' })
    @ApiBearerAuth()
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

    @ApiOperation({ summary: 'Update an order' })
    @ApiResponse({ status: 200, description: 'Order updated successfully' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    @ApiQuery({ name: 'orderID', description: 'The ID of the order to update' })
    @ApiBearerAuth()
    @ApiBody({ type: CreateOrderDTO })
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

    @ApiOperation({ summary: 'Delete an order' })
    @ApiResponse({ status: 200, description: 'Order deleted successfully' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    @ApiQuery({ name: 'orderID', description: 'The ID of the order to delete' })
    @ApiBearerAuth()
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
