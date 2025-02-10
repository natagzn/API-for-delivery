import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateDeliveryDto {
    @ApiProperty({ example: '64b8e68f9c2a6e3b4d8f7a9c', description: 'Order ID associated with the delivery' })
    @IsString()
    @IsNotEmpty()
    readonly order_id: string;

    @ApiProperty({ example: '2025-02-10T12:00:00Z', description: 'Departure date of the delivery', type: Date })
    @IsDate()
    @IsNotEmpty()
    readonly departure_date: Date;

    @ApiProperty({ example: 'pending', description: 'Status ID of the delivery' })
    @IsString()
    @IsNotEmpty()
    readonly status_delivery_id: string;

    @ApiProperty({ example: '2025-02-08T10:00:00Z', description: 'Timestamp when the delivery was created', type: Date })
    @IsDate()
    readonly created_at: Date;
}
