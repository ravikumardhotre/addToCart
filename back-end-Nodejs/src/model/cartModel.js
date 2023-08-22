
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products", // Reference to the product model
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    is_deleted:{
        type:Boolean,
       default:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const cartSchema = new mongoose.Schema({
    items: [cartItemSchema],
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
