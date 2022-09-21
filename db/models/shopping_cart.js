// user_id, products

const { UNSAFE_NavigationContext } = require('react-router-dom');
const client = require('../client');

module.exports = {
  // add your database adapter fns here
  createUserCart,
  createGuestCart,
  addProductToCart,
deleteGuestCart,
deleteProductFromCart,
deleteUserCart,
getUserCart
};

async function createUserCart(userId) {
	try {
		const {
			rows: [userCart],
		} = await client.query(
			`
    INSERT INTO shopping_cart ("userId")
    VALUES ($1)
    RETURNING *;
    
  `,
			[userId]
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
    INSERT INTO shopping_cart ("userIp", "cartProductsId")
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
            INSERT INTO cart_products ("cartId", "productId")
            VALUES ($1, $2)
            RETURNING *;
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
        DELETE FROM cart_products
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
        DELETE FROM cart_products
        WHERE "cartId" = $1
        `, [cartId]
        )
        await client.query(`
        DELETE FROM shopping_cart
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
        DELETE FROM cart_products
        WHERE "cartId" = $1
        `, [cartId]
        )
        await client.query(`
        DELETE FROM shopping_cart
        WHERE "cartId" = $1
        `, [guestIp]
        )
    } catch (error) {
        throw (error)
    }
}

async function attatchProductsToCart(cart) {
    try {

        const {rows} = await client.query(`
          SELECT products.*
          FROM products
          JOIN cart_products ON cart_products."productId" = products.id
          WHERE cart_products."cartId" = $1
        `, [cart.id]);

        console.log("rows from attatch: ", rows)
    
        cart.products = rows

          return cart
      }
      catch (error) {
        console.error(error)
        throw error;
      }
}

async function getUserCart(id) {
    try {
       const userWithCart = await client.query(`
        SELECT shopping_cart.*, users.id AS "userId", users.username, users.password, users.address
        FROM shopping_cart
        JOIN users ON shopping_cart."userId" = users.id
        WHERE shopping_cart."userId" = $1 AND "isPaid" = FALSE
        `, [id])

        console.log("user with cart: ", userWithCart.rows)
        const cartWithProducts = await attatchProductsToCart(userWithCart.rows[0])
        console.log("carts with products: ", cartWithProducts)
        return cartWithProducts
    } catch (error){
        throw(error)
    }
}