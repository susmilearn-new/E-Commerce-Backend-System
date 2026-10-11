const mongoose = require('mongoose')

const orderScema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },

            quantity: {
                type: Number,
                required: true
            },
            price: { 
                type: Number, 
                required: true, 
                min: 0
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "confirmed"],
        default: "pending"
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", orderScema)