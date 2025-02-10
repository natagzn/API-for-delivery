import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GoodsSchema } from './schema/goods.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Goods', schema: GoodsSchema }])
    ],
    providers: [GoodsService],
    controllers: [GoodsController],
    exports: [GoodsService, MongooseModule],
})
export class GoodsModule {}
