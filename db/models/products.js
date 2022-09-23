// table includes product id, name, product description, type(movie, book or album), format, creator (author/director/artist), genre, digital or physical, price, image,

const client = require('../client');

module.exports = {
  // add your database adapter fns here
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct
};

async function createProduct(name, released, description, type, format, creator, genre, isPhysical, price, imageURL) {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
    INSERT INTO products (name, released, description, type, format, creator, genre, "isPhysical", price, "imageURL")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
    
  `,
			[name, released, description, type, format, creator, genre, isPhysical, price, imageURL]
		);
		return product;
	} catch (error) {
		throw error;
	}
}

// edit products function

async function getAllProducts() {

        try {
          const { rows } = await client.query(`
            SELECT * FROM products
            `);
          return rows;
        }
        catch (error) {
          console.error(error);
          throw error;
        }

}

async function getProductById(id) {
  try{
    const {product} = await client.query(`
      SELECT *
      FROM products
      WHERE id = $1
    `[id])

    return product
  } catch (error) {
    throw error
  }
};

async function deleteProduct(id) {
  try {
    const { rows: [product] } = await client.query(
      `DELETE 
      FROM products 
      WHERE id=$1
      RETURNING *`,
       [id]
    )
    return product
  } catch (error) {
    console.error(error);
  }
}