import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDate, IsNotEmpty } from 'class-validator';

export class CreateOrderDTO {
    @ApiProperty({ description: 'ID користувача, який створює замовлення' })
    @IsUUID()
    @IsNotEmpty()
    readonly user_id: string;

    @ApiProperty({ description: 'ID статусу замовлення' })
    @IsUUID()
    @IsNotEmpty()
    readonly status_id: string;

    @ApiProperty({ description: 'ID статусу замовлення' })
    @IsUUID()
    @IsNotEmpty()
    readonly goods_id: string;

    @ApiProperty({ description: 'Дата створення замовлення', example: '2024-02-06T12:00:00Z' })
    @IsDate()
    @IsNotEmpty()
    readonly created_at: Date;
}
