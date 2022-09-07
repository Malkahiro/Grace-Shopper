// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
};

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}

// users id, username, password(hash), is_admin, email(hash), address(hash), name