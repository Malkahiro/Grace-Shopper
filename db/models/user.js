// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt")

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserByUsername,
};

async function getAllUsers() {
	try {
		const {rows} = await client.query(
			`
      SELECT *
      FROM users
    `,
		);
		const allUsers = rows.map((row)=>{
			delete row.password
		});
		return allUsers;
	} catch (error) {
		throw error;
	}
}


async function createUser( username, password, name, email, address, isAdmin) {
  const SALT_COUNT = 10;
  console.log(password, email, name, address)
	const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
	const hashedEmail = await bcrypt.hash(email, SALT_COUNT)
	const hashedAddress = await bcrypt.hash(address, SALT_COUNT)
	try {
		const {
			rows: [user],
		} = await client.query(
			`
    INSERT INTO users (username, password, name, email, address, "isAdmin")
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    
  `,
			[username, hashedPassword, name, hashedEmail, hashedAddress, isAdmin]
		);
		delete user.password;
		return user;
	} catch (error) {
		throw error;
	}
  
}

async function getUserByUsername(username) {
	try {
		const user = await client.query(`
      SELECT id, username
      FROM users
      WHERE username=${username}
    `);
		
		const returnedUser = user.rows[0];
		return returnedUser;
	} catch (error) {
		throw error;
	}
}