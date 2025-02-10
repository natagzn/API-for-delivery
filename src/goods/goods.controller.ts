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
import {GoodsService} from "../goods/goods.service";
import {CreateGoodsDTO} from "../goods/dto/create-goods.dto";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiParam,
    ApiQuery,
    ApiBearerAuth,
    ApiOkResponse
} from '@nestjs/swagger';


@Controller('goods')
export class GoodsController {
    constructor(private goodsService: GoodsService) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new goods item' })
    @ApiBearerAuth()
    @ApiBody({ type: CreateGoodsDTO })
    async addGoods(@Res() res, @Body() createGoodsDTO: CreateGoodsDTO) {
        try{
            const goods = await this.goodsService.addGoods(createGoodsDTO);
            console.log(goods);
            return res.status(HttpStatus.OK).json({
                message: "goods has been created successfully",
                goods
            })
        }catch(err){
            console.log(err);
        }
    }

    @Get('all')
    @ApiOperation({ summary: 'Get all goods' })
    @ApiBearerAuth()
    async getAllOrder(@Res() res) {
        try{
            const goods = await this.goodsService.getAllGoods();
            return res.status(HttpStatus.OK).json(goods);
        }catch(err){
            console.log(err);
        }
    }

    @Get(':goodsID')
    @ApiOperation({ summary: 'Get goods by ID' })
    @ApiBearerAuth()
    @ApiParam({ name: 'goodsID', description: 'The ID of the goods', type: String })
    @ApiResponse({ status: 200, description: 'Goods found', type: CreateGoodsDTO })
    @ApiResponse({ status: 404, description: 'Goods not found' })
    async getOrder(@Res() res, @Param('goodsID') goodsID) {
        try{
            const goods = await this.goodsService.getGoods(goodsID);
            if (!goods) throw new NotFoundException('goods does not exist!');
            return res.status(HttpStatus.OK).json(goods);
        }catch(err){
            console.log(err);
        }
    }

    @Put('update')
    @ApiOperation({ summary: 'Update a goods item' })
    @ApiBearerAuth()
    @ApiQuery({ name: 'goodsID', description: 'The ID of the goods to update', type: String })
    @ApiBody({ type: CreateGoodsDTO })
    @ApiResponse({ status: 200, description: 'Goods updated successfully' })
    @ApiResponse({ status: 404, description: 'Goods not found' })
    async updateGoods(@Res() res, @Query('goodsID') goodsID, @Body() createGoodsDTO: CreateGoodsDTO) {
        try{
            const goods = await this.goodsService.updateGoods(goodsID, createGoodsDTO);
            if (!goods) throw new NotFoundException('goods does not exist!');
            return res.status(HttpStatus.OK).json({
                message: 'goods has been successfully updated',
                goods
            });
        }catch(err){
            console.log(err);
        }
    }

    @Delete('delete')
    @ApiOperation({ summary: 'Delete a goods item' })
    @ApiBearerAuth()
    @ApiQuery({ name: 'goodsID', description: 'The ID of the goods to delete', type: String })
    @ApiResponse({ status: 200, description: 'Goods deleted successfully' })
    @ApiResponse({ status: 404, description: 'Goods not found' })
    async deleteOrder(@Res() res, @Query('goodsID') goodsID) {
        try{
            const goods = await this.goodsService.deleteGoods(goodsID);
            if (!goods) throw new NotFoundException('goods does not exist');
            return res.status(HttpStatus.OK).json({
                message: 'goods has been deleted',
                goods
            })
        }catch(err){
            console.log(err);
        }
    }

}
