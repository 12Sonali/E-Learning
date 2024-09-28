import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
    razopay_payment_id: {
        type: String,
        required: true 
    },
    razopay_subscription_id : {
        type: String,
        require: true,
    },
    razopay_signature: {
        type: String,
        required: true
    }
}, {
    timestamps: true

});