const express = require("express");
const cartsRouter = express.Router();
const {
Cart
} = require("../db/index");
const {requireUser, requireAdmin } = require('./utils')


cartsRouter.get('/:userId', async (req, res, next) => {
    console.log(req.body)
    const userId = req.params.userId

    try {
        const response = await Cart.getUserCart(userId)

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

cartsRouter.patch('/:cartId', requireUser, async (req, res, next) => {
    try {
        const cartId = req.params.cartId
        const {userId } = req.body
        const response = await Cart.checkoutCart(userId, cartId)
        res.send(response)
    } catch (error) {
        next(error)
    }
})


cartsRouter.patch('/:cartId/:productId', requireUser, async (req, res, next) => {
    try {
        const {cartId, productId} = req.params
        const quantity = req.body
        const response = await Cart.updateProductQuantity(cartId, productId,quantity)
        res.send(response)
    } catch (error){
        next (error)
    }
})

module.exports = cartsRouter;
