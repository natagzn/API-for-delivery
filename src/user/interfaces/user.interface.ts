import { Document } from 'mongoose';

export interface Order extends Document {
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly phone: string;
    readonly created_at: Date;
}
