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
import {StatusDeliveryService} from "../status-delivery/status-delivery.service";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateStatusDeliveryDto} from "../status-delivery/dto/statusDelivery.dto";
import {Roles} from "../auth/roles.decorator";

@ApiTags('Status Delivery')
@Controller('status-delivery')
export class StatusDeliveryController {
    constructor(private statusDeliveryService: StatusDeliveryService) { }


    @Post('create')
    @ApiOperation({ summary: 'Create a new status delivery' })
    @ApiBody({ type: CreateStatusDeliveryDto })
    @ApiResponse({ status: 200, description: 'StatusDelivery has been created successfully' })
    @Post('create')
    async addStatusDelivery(@Res() res, @Body() createStatusDeliveryDto: CreateStatusDeliveryDto) {
        try{
            const StatusDelivery = await this.statusDeliveryService.addStatusDelivery(createStatusDeliveryDto);
            console.log(StatusDelivery);
            return res.status(HttpStatus.OK).json({
                message: "StatusDelivery has been created successfully",
                StatusDelivery
            })
        }catch(err){
            console.log(err);
        }
    }


    @Get('all')
    @ApiOperation({ summary: 'Get all status deliveries' })
    @ApiResponse({ status: 200, description: 'List of all status deliveries', type: [CreateStatusDeliveryDto] })
    async getAllStatusDelivery(@Res() res) {
        try{
            const statusDelivery = await this.statusDeliveryService.getAllstatusDelivery();
            return res.status(HttpStatus.OK).json(statusDelivery);
        }catch(err){
            console.log(err);
        }
    }

    @Get(':statusDeliveryID')
    @ApiOperation({ summary: 'Get a status delivery by ID' })
    @ApiParam({ name: 'statusDeliveryID', description: 'The ID of the status delivery', type: String })
    @ApiResponse({ status: 200, description: 'Status delivery found', type: CreateStatusDeliveryDto })
    @ApiResponse({ status: 404, description: 'Status delivery not found' })
    async getStatusDelivery(@Res() res, @Param('statusDeliveryID') statusDeliveryID) {
        try{
            const statusDelivery = await this.statusDeliveryService.getStatusDelivery(statusDeliveryID);
            if (!statusDelivery) throw new NotFoundException('statusOrder does not exist!');
            return res.status(HttpStatus.OK).json(statusDelivery);
        }catch(err){
            console.log(err);
        }
    }

    @Put('/update')
    @ApiOperation({ summary: 'Update a status delivery' })
    @ApiQuery({ name: 'statusDeliveryID', description: 'The ID of the status delivery to update', type: String })
    @ApiBody({ type: CreateStatusDeliveryDto })
    @ApiResponse({ status: 200, description: 'Status delivery updated successfully' })
    @ApiResponse({ status: 404, description: 'Status delivery not found' })
    async updateStatusDelivery(@Res() res, @Query('statusDeliveryID') statusDeliveryID, @Body() createStatusDeliveryDto: CreateStatusDeliveryDto) {
        try{
            const statusDelivery = await this.statusDeliveryService.updateStatusDelivery(statusDeliveryID, createStatusDeliveryDto);
            if (!statusDelivery) throw new NotFoundException('statusDelivery does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'statusDelivery has been successfully updated',
                statusDelivery
            });
        }catch(err){
            console.log(err);
        }
    }


    @Delete('/delete')
    @ApiOperation({ summary: 'Delete a status delivery' })
    @ApiQuery({ name: 'statusDeliveryID', description: 'The ID of the status delivery to delete', type: String })
    @ApiResponse({ status: 200, description: 'Status delivery deleted successfully' })
    @ApiResponse({ status: 404, description: 'Status delivery not found' })
    async deleteStatusDelivery(@Res() res, @Query('statusDeliveryID') statusDeliveryID) {
        try{
            console.log(statusDeliveryID);
            const statusDelivery = await this.statusDeliveryService.deleteStatusDelivery(statusDeliveryID);
            if (!statusDelivery) throw new NotFoundException('statusDelivery does not exist');
            return res.status(HttpStatus.OK).json({
                message: 'statusDelivery has been deleted',
                statusDelivery
            })
        }catch(err){
            console.log(err);
        }
    }

}
