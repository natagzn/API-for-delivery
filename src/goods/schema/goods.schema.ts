import * as mongoose from 'mongoose';

export const GoodsSchema = new mongoose.Schema({
    name: String,
    count: Number,
    price: Number,
    created_at: { type: Date, default: Date.now }
})
