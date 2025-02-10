import { Document } from 'mongoose';


export interface Goods extends Document {
    readonly name: String;
    readonly count: Number;
    readonly price: Number;
    readonly created_at: Date;
}
