import { Document } from 'mongoose';

export interface StatusDeliveryInterface extends Document {
    readonly name: string;
    readonly created_at: Date;
}
