const express = require("express");
const productsRouter = express.Router();
const {
Product
} = require("../db/index");


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

module.exports = productsRouter;

