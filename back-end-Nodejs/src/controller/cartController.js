const productSchema = require('../model/productmodel');
const ObjectId = require('mongodb').ObjectId;
const cartModel=require('../model/cartModel');
const addToCart = async (req, res) => {
    try {
        const requestBody = req.body;
        const { productId, quantity } = requestBody;

        const product = await productSchema.findOne({ _id: productId });

        if (!product) {
            return res.status(200).send({ status: false, message: "Product not found" });
        }

        let cart = await cartModel.findOne();

        if (!cart) {
            cart = new cartModel({ items: [] }); // Initialize cart with an empty array of items
        }

        // Check if cart.items is an array before using find
        if (cart.items && Array.isArray(cart.items)) {
            const existingItem = cart.items.find(item => item.product.equals(productId));
            if (existingItem) {
                // If the product exists, increase the quantity
                existingItem.quantity += 1;
            } else {
                // If the product doesn't exist, add a new cart item
                cart.items.push({ product: productId, quantity });
            }
        }

        await cart.save();

        return res.status(200).send({ status: true, message: "Product added to cart", cart });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};


  const deleteFromCart = async (req, res) => {
    try {
        const productId = req.body.productId;

        const product = await productSchema.findById(productId);

        if (!product) {
            return res.status(404).send({ status: false, message: "Product not found" });
        }

        let cart = await cartModel.findOne();

        if (!cart) {
            return res.status(404).send({ status: false, message: "Cart not found" });
        }

        const cartItemIndex = cart.items.findIndex(item => item.product.equals(product._id));

        if (cartItemIndex === -1) {
            return res.status(404).send({ status: false, message: "Product not found in cart" });
        }

       
        cart.items.splice(cartItemIndex, 1);

        await cart.save(); 
        return res.status(200).send({ status: true, message: "Product removed from cart", cart });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const getCart = async (req, res) => {
    try {
        let cart = await cartModel.findOne()
            .populate({
                path: 'items.product',
                model: 'product', 
            });

        if (!cart) {
            return res.status(200).send({ status: false, message: "Cart not found" });
        }

        return res.status(200).send({ status: true, message: "Cart retrieved successfully", cart });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};



module.exports = {
    addToCart,deleteFromCart,getCart
}