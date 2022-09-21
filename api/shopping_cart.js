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

cartsRouter.post('/,', requireUser, async (req, res, next) => {
    try {
        /// if there is no user cart or user cart isPaid, create a user cart, otherwise just add product to cart.

        const {cartId, productId} = req.body
        const response = await Cart.addProductToCart(cartId, productId)
        res.send(response)
        
    } catch (error){
        next(error)
    }
})

cartsRouter.delete('/', requireUser, async (req, res, next) => {
    try {
        const {cartId, productId} = req.body
        const response = await Cart.deleteProductFromCart(cartId, productId)
        res.send(response)
    } catch (error) {
        next(error)
    }
})

cartsRouter.delete('/:cartId', requireUser, async (req, res, next) => {
    try {
        const {userId, cartId} = req.body
        const response = await Cart.deleteUserCart(userId, cartId)
        res.send(response)
    } catch (error) {
        next(error)
    }
})


module.exports = cartsRouter;
