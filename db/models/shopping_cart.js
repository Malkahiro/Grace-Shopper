// user_id, products

const client = require('../client');

module.exports = {
  // add your database adapter fns here
  createUserCart,
  createGuestCart,
  addProductToCart,
deleteGuestCart,
deleteProductFromCart,
deleteUserCart
};

async function createUserCart(userId, cartProductsId ) {
	try {
		const {
			rows: [userCart],
		} = await client.query(
			`
    INSERT INTO shopping-cart ("userId", "cartProductsId")
    VALUES ($1, $2)
    RETURNING *;
    
  `,
			[userId, cartProductsId]
		);
		return userCart;
	} catch (error) {
		throw error;
	}
}

async function createGuestCart(userIp, cartProductsId) {
	try {
		const {
			rows: [guestCart],
		} = await client.query(
			`
    INSERT INTO shopping-cart ("userIp", "cartProductsId")
    VALUES ($1, $2)
    RETURNING *;
    
  `,
			[userIp, cartProductsId]
		);
		return guestCart;
	} catch (error) {
		throw error;
	}
}

async function addProductToCart(cartId, productId) {
    try {
        const {
            rows: [cartProduct],
        } = await client.query(
            `
            INSERT INTO cart-products ("cartId", "productId")
            VALUES ($1, $2)
            RETURNING *:
            `, [cartId, productId]
        )
        return cartProduct
    } catch (error) {
        throw (error)
    }
}

async function deleteProductFromCart(cartId, productId) {
    try{
        await client.query(`
        DELETE FROM cart-products
        WHERE "cartId" = $1 AND "productId" = $2
        `, [cartId, productId]
        )
    } catch (error) {
        throw (error)
    }
}

async function deleteUserCart(userId, cartId) {
    try{
        await client.query(`
        DELETE FROM cart-products
        WHERE "cartId" = $1
        `, [cartId]
        )
        await client.query(`
        DELETE FROM shopping-cart
        WHERE "cartId" = $1
        `, [userId]
        )
    } catch (error) {
        throw (error)
    }
}

async function deleteGuestCart(guestIp, cartId) {
    try{
        await client.query(`
        DELETE FROM cart-products
        WHERE "cartId" = $1
        `, [cartId]
        )
        await client.query(`
        DELETE FROM shopping-cart
        WHERE "cartId" = $1
        `, [guestIp]
        )
    } catch (error) {
        throw (error)
    }
}