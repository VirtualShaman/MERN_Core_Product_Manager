const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters"]
    }
});

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product;