// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt")

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
};

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}

// users id, username, password(hash), is_admin, email(hash), address(hash), name

async function createUser({ username, password }) {

  const SALT_COUNT = 10;

	const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
	try {
		const {
			rows: [user],
		} = await client.query(
			`
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    
  `,
			[username, hashedPassword]
		);
		delete user.password;
		return user;
	} catch (error) {
		throw error;
	}
  
}