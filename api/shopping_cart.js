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

cartsRouter.post('/,', async (req, res, next) => {
    try {
        const {userId, productId} = req.body
        const cart = await Cart.getUserCart(userId)

        if (!cart || cart.isPaid) {
            newCart = await Cart.createUserCart(userId)
            cartId = newCart.id
        } else {
            cartId = cart.id
        }


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


cartsRouter.patch('/:cartId', async (req, res, next) => {
    try {
        const {cartId, productId, quantity} = req.body
        const response = await Cart.updateProductQuantity(cartId, productId,quantity)
        res.send(response)
    } catch (error){
        next (error)
    }
})

module.exports = cartsRouter;
