import { Document } from 'mongoose';


export interface Student extends Document {
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly phone: string;
    readonly created_at: Date;
}
