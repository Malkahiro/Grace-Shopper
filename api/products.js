const express = require("express");
const productsRouter = express.Router();
const {
Product
} = require("../db/index");
const { createProduct } = require("../db/models/products");
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
    console.log("Hello")
    try {
        const {name, released, description, type, format, creator, genre, isPhysical, price, imageURL} = req.body.product
        const response = await createProduct(name, released, description, type, format, creator, genre, isPhysical, price, imageURL)
console.log("name", name)
        res.send(response)
        
    } catch (error){
        next(error)
    }
})

module.exports = productsRouter;

