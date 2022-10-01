const express = require("express");
const productsRouter = express.Router();
const {
Product
} = require("../db/index");
// const { createProduct } = require("../db/models/products");
const {requireUser, requireAdmin } = require('./utils')

productsRouter.get('/', async (req, res, next) => {
    try {
      const response = await Product.getAllProducts();
      res.send(response);
    } catch (error) {
      next(error);
    }
  });

productsRouter.get('/:productId', async (req, res, next) => {
    const productId = req.body
    try {
        const response = await Product.getProductById(productId)

        res.send(response)
    } catch (error) {
        next(error)
    }
})

productsRouter.post('/', requireAdmin, async (req, res, next) => {
    try {
        const {name, released, description, type, format, creator, genre, isPhysical, price, imageURL} = req.body.product
        const response = await Product.createProduct(name, released, description, type, format, creator, genre, isPhysical, price, imageURL)
        res.send(response)
        
    } catch (error){
        next(error)
    }
});

productsRouter.delete('/products/:productId', async (req, res, next) => {
    try {
      const product = await Product.deleteProduct(req.params.productId);
      res.send(product);
    } catch (error) {
      next(error)
    }
  });

productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => {
    try {
    const {name, released, description, type, format, creator, genre, isPhysical, price, imageURL} = req.body
    const id = req.params.productId
    const updatedProduct = await Product.editProduct(id, name, released, description, type, format, creator, genre, isPhysical, price, imageURL)
    res.send(updatedProduct)
    }catch (error) {
        next(error)
    }
})

module.exports = productsRouter;

