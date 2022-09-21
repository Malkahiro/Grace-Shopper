const express = require("express");
const cartsRouter = express.Router();
const {
Cart
} = require("../db/index");
const {requireUser, requireAdmin } = require('./utils')

cartsRouter.get('/:cartId', async (req, res, next) => {
    const cartId = req.body
    try {
        const response = await Cart.getUserCart(cartId)

        res.send(response)
    } catch (error) {
        next(error)
    }
})

module.exports = cartsRouter;
