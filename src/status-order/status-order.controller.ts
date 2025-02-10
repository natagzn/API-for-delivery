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
import {Roles} from "../auth/roles.decorator";
import {CreateStatusOrderDto} from "./dto/statusOrder.dto";
import {StatusOrderService} from "./status-order.service";
import {ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery, ApiBearerAuth} from '@nestjs/swagger';

@ApiTags('Status Orders')
@Controller('status-order')
export class StatusOrderController {
    constructor(private statusOrderService: StatusOrderService) { }


    @ApiOperation({ summary: 'Create a new status order' })
    @ApiResponse({ status: 200, description: 'StatusOrder created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiBody({ type: CreateStatusOrderDto })
    @ApiBearerAuth()
    @Post('create')
    async addStatusOrder(@Res() res, @Body() createStatusOrderDTO: CreateStatusOrderDto) {
        try{
            const StatusOrder = await this.statusOrderService.addStatusOrder(createStatusOrderDTO);
            console.log(StatusOrder);
            return res.status(HttpStatus.OK).json({
                message: "StatusOrder has been created successfully",
                StatusOrder
            })
        }catch(err){
            console.log(err);
        }
    }


    @Get('all')
    @ApiOperation({ summary: 'Get all status orders (Admin only)' })
    @ApiResponse({ status: 200, description: 'List of all status orders' })
    @ApiBearerAuth()
    //@UseGuards(AuthGuard, RolesGuard)
    @Roles(['admin'])
    async getAllStatusOrder(@Res() res) {
        try{
            const statusOrderService = await this.statusOrderService.getAllstatusOrder();
            return res.status(HttpStatus.OK).json(statusOrderService);
        }catch(err){
            console.log(err);
        }
    }

    @Get('statusOrder/:statusOrderID')
    @ApiOperation({ summary: 'Get a specific status order by ID' })
    @ApiResponse({ status: 200, description: 'Status order found' })
    @ApiResponse({ status: 404, description: 'Status order not found' })
    @ApiParam({ name: 'statusOrderID', description: 'The ID of the status order' })
    @ApiBearerAuth()
    @Get('statusOrder/:statusOrderID')
    async getUser(@Res() res, @Param('statusOrderID') statusOrderID) {
        try{
            const statusOrder = await this.statusOrderService.getStatusOrder(statusOrderID);
            if (!statusOrder) throw new NotFoundException('statusOrder does not exist!');
            return res.status(HttpStatus.OK).json(statusOrder);
        }catch(err){
            console.log(err);
        }
    }

    @Put('/update')
    @ApiOperation({ summary: 'Update a status order' })
    @ApiResponse({ status: 200, description: 'StatusOrder updated successfully' })
    @ApiResponse({ status: 404, description: 'StatusOrder not found' })
    @ApiQuery({ name: 'statusOrderID', description: 'The ID of the status order to update' })
    @ApiBearerAuth()
    @ApiBody({ type: CreateStatusOrderDto })
    async updateStatusOrder(@Res() res, @Query('statusOrderID') statusOrderID, @Body() createStatusOrderDTO: CreateStatusOrderDto) {
        try{
            const statusOrder = await this.statusOrderService.updateStatusOrder(statusOrderID, createStatusOrderDTO);
            if (!statusOrder) throw new NotFoundException('StatusOrder does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'statusOrder has been successfully updated',
                statusOrder
            });
        }catch(err){
            console.log(err);
        }
    }

    @ApiOperation({ summary: 'Delete a status order' })
    @ApiResponse({ status: 200, description: 'StatusOrder deleted successfully' })
    @ApiResponse({ status: 404, description: 'StatusOrder not found' })
    @ApiQuery({ name: 'statusOrderID', description: 'The ID of the status order to delete' })
    @ApiBearerAuth()
    @Delete('/delete')
    async deleteStatusOrder(@Res() res, @Query('statusOrderID') statusOrderID) {
        try{
            console.log(statusOrderID);
            const statusOrder = await this.statusOrderService.deleteStatusOrder(statusOrderID);
            if (!statusOrder) throw new NotFoundException('deleteStatusOrder does not exist');
            return res.status(HttpStatus.OK).json({
                message: 'deleteStatusOrder has been deleted',
                statusOrder
            })
        }catch(err){
            console.log(err);
        }
    }

}
