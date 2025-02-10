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
import {DeliveryService} from "./delivery.service";
import {CreateDeliveryDto} from "../delivery/dto/create-delivery.dto";
import {Roles} from "../auth/roles.decorator";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
    constructor(private deliveryService: DeliveryService) { }

    @ApiOperation({ summary: 'Create a new delivery', description: 'Adds a new delivery entry to the database.' })
    @ApiBody({ type: CreateDeliveryDto })
    @ApiResponse({ status: 200, description: 'Delivery created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    @Post('create')
    async addDelivery(@Res() res, @Body() createDeliveryDTO: CreateDeliveryDto) {
        try{
            const delivery = await this.deliveryService.addDelivery(createDeliveryDTO);
            console.log(delivery);
            return res.status(HttpStatus.OK).json({
                message: "Delivery has been created successfully",
                delivery: delivery
            })
        }catch(err){
            console.log(err);
        }
    }


    @ApiOperation({ summary: 'Get all deliveries', description: 'Retrieves a list of all deliveries.' })
    @ApiResponse({ status: 200, description: 'Returns a list of deliveries.' })
    @Get('all')
    //@UseGuards(AuthGuard, RolesGuard)
    //@Roles(['admin'])
    async getAllDelivery(@Res() res) {
        try{
            const delivery = await this.deliveryService.getAllDelivery();
            return res.status(HttpStatus.OK).json(delivery);
        }catch(err){
            console.log(err);
        }
    }

    @ApiOperation({ summary: 'Get delivery by ID', description: 'Retrieves a delivery by its unique ID.' })
    @ApiParam({ name: 'deliveryID', required: true, description: 'The ID of the delivery' })
    @ApiResponse({ status: 200, description: 'Returns the delivery details.' })
    @ApiResponse({ status: 404, description: 'Delivery not found.' })
    @Get('delivery/:deliveryID')
    async getDelivery(@Res() res, @Param('deliveryID') deliveryID) {
        try{
            const delivery = await this.deliveryService.getDelivery(deliveryID);
            if (!delivery) throw new NotFoundException('delivery does not exist!');
            return res.status(HttpStatus.OK).json(delivery);
        }catch(err){
            console.log(err);
        }
    }

    @ApiOperation({ summary: 'Update a delivery', description: 'Updates delivery details based on ID.' })
    @ApiBody({ type: CreateDeliveryDto })
    @ApiResponse({ status: 200, description: 'Delivery updated successfully.' })
    @ApiResponse({ status: 404, description: 'Delivery not found.' })
    @Put('/update')
    async updateDelivery(@Res() res, @Query('deliveryID') deliveryID, @Body() createDeliveryDTO: CreateDeliveryDto) {
        try{
            const delivery = await this.deliveryService.updateDelivery(deliveryID, createDeliveryDTO);
            if (!delivery) throw new NotFoundException('delivery does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'delivery has been successfully updated',
                delivery
            });
        }catch(err){
            console.log(err);
        }
    }

    @ApiOperation({ summary: 'Delete a delivery', description: 'Removes a delivery from the database.' })
    @ApiResponse({ status: 200, description: 'Delivery deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Delivery not found.' })
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('deliveryID') deliveryID) {
        try{
            console.log(deliveryID);
            const delivery = await this.deliveryService.deleteUser(deliveryID);
            if (!delivery) throw new NotFoundException('delivery does not exist');
            return res.status(HttpStatus.OK).json({
                message: 'delivery has been deleted',
                delivery
            })
        }catch(err){
            console.log(err);
        }
    }

}
