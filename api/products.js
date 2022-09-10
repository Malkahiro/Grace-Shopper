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

module.exports = productsRouter;