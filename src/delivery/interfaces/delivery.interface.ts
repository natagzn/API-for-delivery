import { Document } from 'mongoose';

export interface DeliveryInterface extends Document {
    readonly order_id: string;
    readonly departure_date: Date;
    readonly status_delivery_id: string;
    readonly created_at: Date;
}
