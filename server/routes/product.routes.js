const ProductController = require("../controllers/product.controller")

module.exports = app => {
    app.post("/api/products/create", ProductController.createProduct);

    app.get("/api/products/random", ProductController.findRandomProduct);

    app.get("/api/products/:_id", ProductController.findOneProduct);

    app.get("/api/products", ProductController.findAllProducts);

    app.put("/api/products/update/:_id", ProductController.updateProduct);

    app.delete("/api/products/delete/:_id", ProductController.deleteProduct);
}