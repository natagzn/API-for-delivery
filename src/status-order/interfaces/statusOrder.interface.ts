import { Document } from 'mongoose';

export interface StatusOrderInterface extends Document {
    readonly name: string;
    readonly created_at: Date;
}
