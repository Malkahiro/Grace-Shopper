// user_id, products

const { UNSAFE_NavigationContext } = require('react-router-dom');
const client = require('../client');

module.exports = {
  createUserCart,
  addProductToCart,
deleteProductFromCart,
checkoutCart,
getUserCart,
updateProductQuantity
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

async function checkoutCart(cartId) {
    try{
        await client.query(`
        UPDATE shopping_cart
        SET "isPaid"=TRUE
        WHERE id = $1
        `, [cartId]
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
            SELECT shopping_cart.*, users.id AS "userId", users.username, users.address
            FROM shopping_cart
            JOIN users ON shopping_cart."userId" = users.id
            WHERE shopping_cart."userId" = $1 and "isPaid" = FALSE
            `, [id])
    if (!userWithCart.rows.length) {return false}
            const cartWithProducts = await attatchProductsToCart(userWithCart.rows[0])
            return cartWithProducts
      
    } catch (error){
        console.error(error)
        throw(error)
    }
}

async function updateProductQuantity(cartId, productId, quantity){
    try{
        await client.query(`
        UPDATE cart_products
        SET quantity=($3)
        WHERE "cartId" = ($1) AND "productId" = ($2)
        RETURNING *
        `, [cartId, productId, quantity])
    } catch (error) {
        throw(error)
    }
}
//update product quantity function