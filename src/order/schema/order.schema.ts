import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    user_id: String,
    status_id: String,
    created_at: { type: Date, default: Date.now }
})