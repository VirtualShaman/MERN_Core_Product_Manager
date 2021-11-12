const Product = require("../models/product.model");

module.exports.createProduct = (req, res) => {
    Product.create(req.body)
        .then(newProduct => res.json(newProduct))
        .catch(err => res.json({message: "Something went wrong when creating a product", err: err}))
}

module.exports.findRandomProduct = (req, res) => {
    function getRandomInt(max){
        return Math.floor(Math.random() * max);
    }

    Product.findOne({_id: req.params._id})
        .then(randomProduct => {
            const randomIndex = getRandomInt(allProducts.length)
            res.json({results: allProducts[randomIndex]})
        })
        .catch(err => res.json({message: "Something went wrong when finding a random product", err: err}))
}

module.exports.findOneProduct = (req, res) => {
    Product.findOne({_id: req.params._id})
        .then(oneProduct => res.json(oneProduct))
        .catch(err => res.json({message: "Something went wrong when finding a product", err: err}))
}

module.exports.findAllProducts = (req, res) => {
    Product.find()
        .then(allProducts => res.json(allProducts))
        .catch(err => res.json({message: "Something went wrong when finding all the products", err: err}))
}

module.exports.updateProduct = (req, res) => {
    Product.findOneAndUpdate({_id: req.params._id}, req.body)
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => res.json({message: "Something went wrong when updating a product", err: err}))
}

module.exports.deleteProduct = (req, res) => {
    Product.deleteOne({_id: req.params._id})
        .then(deletedProduct => res.json(deletedProduct))
        .catch(err => res.json({message: "Something went wrong when deleting a product", err: err}))
}