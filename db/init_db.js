const {
  client,
  users,
  products,
  } = require('./');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Starting to drop all tables...")
    await client.query(`
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
        "isAdmin" BOOLEAN DEFAULT false
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        type VARCHAR(255) NOT NULL,
        format VARCHAR(255) NOT NULL,
        creator VARCHAR(255) NOT NULL,
        genre VARCHAR(255) NOT NULL,
        "isPhysical" BOOLEAN DEFAULT true,
        price INTEGER NOT NULL,
        "imageURL" TEXT NOT NULL   
      )
    `)
    console.log("Finished creating tables!")
  } catch (error) {
    console.log("Error while creating Tables!")
    throw error;
  }
}

async function populateInitialData() {
  try {
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
