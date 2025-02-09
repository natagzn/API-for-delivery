import * as mongoose from 'mongoose';

export const DeliverySchema = new mongoose.Schema({
    order_id: String,
    departure_date: Date,
    status_delivery_id: String,
    created_at: { type: Date, default: Date.now }
})
