import { Document } from 'mongoose';

export interface Order extends Document {
    readonly user_id: string;
    readonly status_id: string;
    readonly goods_id: string;
    readonly created_at: Date;
}