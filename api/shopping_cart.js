const express = require("express");
const cartsRouter = express.Router();
const {
Cart
} = require("../db/index");
const {requireUser} = require('./utils')


cartsRouter.get('/', requireUser, async (req, res, next) => {
    const userId = req.user.id

    try {
        const response = await Cart.getUserCart(userId)

        res.send(response)
    } catch (error) {
        next(error)
    }
})

cartsRouter.post('/', requireUser, async (req, res, next) => {
    try {
        const {productId} = req.body
        const userId = req.user.id
        const cart = await Cart.getUserCart(userId)
        let cartId = '';

        if (!cart || cart.isPaid) {
            const newCart = await Cart.createUserCart(userId)
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

cartsRouter.delete('/:cartId/:productId', requireUser, async (req, res, next) => {
    try {
        const {cartId, productId} = req.params
        const response = await Cart.deleteProductFromCart(cartId, productId)
        res.send(response)
    } catch (error) {
        next(error)
    }
})

cartsRouter.patch('/:cartId', requireUser, async (req, res, next) => {
    try {
        const cartId = req.params.cartId
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
