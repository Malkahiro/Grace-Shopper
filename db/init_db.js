const {
  User,
  Product,
  Cart
  } = require('./');
  const client = require("./client")


async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Starting to drop all tables...")
    await client.query(`
      DROP TABLE IF EXISTS cart_products;
      DROP TABLE IF EXISTS shopping_cart;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `)

    console.log("Finished dropping all tables!")

    // build tables in correct order

    console.log("Starting to create tables...")

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
        
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        released INTEGER NOT NULL,
        description TEXT NOT NULL,
        type VARCHAR(255) NOT NULL,
        format VARCHAR(255) NOT NULL,
        creator VARCHAR(255) NOT NULL,
        genre VARCHAR(255) NOT NULL,
        "isPhysical" BOOLEAN DEFAULT true,
        price INTEGER NOT NULL,
        "imageURL" TEXT NOT NULL   
      );

      CREATE TABLE shopping_cart (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES users (id),
        "isPaid" BOOLEAN DEFAULT FALSE
      );

      CREATE TABLE cart_products (
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER NOT NULL REFERENCES shopping_cart (id),
        "productId" INTEGER NOT NULL REFERENCES products (id),
        quantity INTEGER DEFAULT 1

      );
    `)
    console.log("Finished creating tables!")
  } catch (error) {
    console.log("Error while creating Tables!")
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("Creating initial users...")
    
    const user1 = await User.createUser("admin", "NabooIsGreat1", "Admin", "admin@gmail.com", "texas", true)
    const user2 = await User.createUser("chris", "Gigabyte1", "chris", "chris@gmail.com", "dallas, tx")
    const user3 = await User.createUser("malka", "Rowlett1", "malka", "malka@gmail.com", "Rowlett, TX")
    const user4 = await User.createUser("jake", "DoAKickflip", "jake", "jake@gmail.com", "Tulsa, OK")
    const user5 = await User.createUser("shelby", "DanceDanceRevolution", "shelby", "shelby@gmail.com", "Jacksonville, FL")

    console.log("Initial users created!")
    console.log("Creating initial products...")

    const product1 = await Product.createProduct("Let's Dance", 1983, "The vinyl for the album Let's Dance.", "music", "vinyl", "David Bowie", "pop", true, 10, "https://m.media-amazon.com/images/I/71jqmSUx5LL._SL1425_.jpg")
    const product2 = await Product.createProduct("This Land", 2019, "The CD for the album This Land", "music", "cd", "Gary Clark Jr.", "rock", true, 10, "https://m.media-amazon.com/images/I/61-EMLISJjL._SL1500_.jpg")
    const product3 = await Product.createProduct("The Essential Book of Vegan Bakes", 2010, "A vegan baking cookbook", "book", "soft cover", "Holly Jade", "non-fiction", true, 13, "https://images-na.ssl-images-amazon.com/images/I/61r0vB5doAL.jpg")
    const product4 = await Product.createProduct("Eyes of the Void", 1987, "A science fiction book", "book", "audiobook", "Adrian Tchaikovsky", "science-fiction", false, 5, "https://m.media-amazon.com/images/I/51O1u7FL5rL.jpg")
    const product5 = await Product.createProduct("Mad Max: Fury Road", 2015, "The newest Mad Max Film", "movie", "digital download", "George Miller", "action", false, 5, "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg")

    console.log("Finished creating initial products!")
    console.log("Creating shopping carts...")

    const cart1 = await Cart.createUserCart(3)
    const cart2 = await Cart.createUserCart(4)

    console.log("Finished creating carts!")
    console.log("Adding products to carts...")

    const cartProduct1 = await Cart.addProductToCart(1, 1)
    const cartProduct2 = await Cart.addProductToCart(1, 2)
    const cartProduct3 = await Cart.addProductToCart(1, 3)
    const cartProduct4 = await Cart.addProductToCart(2, 4)
    const cartProduct5 = await Cart.addProductToCart(2, 5)

    console.log("Finished adding products to carts!")
    console.log("Checking user carts...")

    const checkCart1 = await Cart.getUserCart(3)
    const checkCart2 = await Cart.getUserCart(4)

    console.log("Finished checking users carts!")

    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
