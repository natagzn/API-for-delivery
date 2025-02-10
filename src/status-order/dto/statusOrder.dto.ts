import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';


export class CreateStatusOrderDto {
    @ApiProperty({ example: 'Processing', description: 'Status name' })
    @IsString()
    readonly name: string;

    @ApiProperty({ example: '2024-02-10T12:00:00Z', description: 'Creation date' })
    @IsDate()
    readonly created_at: Date;
}