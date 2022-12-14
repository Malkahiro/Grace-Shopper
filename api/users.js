const express = require("express");
const usersRouter = express.Router();
const {
User
} = require("../db/index");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt")

// code here

usersRouter.get('/', async (req, res, next) => {
	try {
    const users = await User.getAllUsers();
  res.send(
    users
  );
} catch (error) {
	next(error);
}
});

usersRouter.post("/register", async (req, res, next) => {
	const { username, password, name, email, address } = req.body;

	try {
		const _user = await User.getUserByUsername(username);

		if (_user) {
			next({
				error: "error",
				name: "UserExistsError",
				message: `User ${username} is already taken.`,
			});
		}
		
		if (password.length < 8) {
			next({
				error: "error",
				name: "PasswordLengthError",
				message: "Password Too Short!",
			});
		}

		const user = await User.createUser( username, password, name, email, address );

		const token = jwt.sign(
			{
				id: user.id,
				username: username,
				password: password,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "1w",
			}
		);

		res.send({
			message: "Thank you for signing up!",
			token: token,
			user: user,
		});
	} catch (error) {
		next(error);
	}
});

usersRouter.post("/login", async (req, res, next) => {
	const { username, password } = req.body;
	const SALT_COUNT = 10;

	const user = await User.getUserByUsername(username);
	const userPassword = user.password

	const isValid = await bcrypt.compare(password, userPassword);
	if (!username || !password) {
		next(
			{error: {
			name: "MissingCredentialsError",
			message: "Please supply both a username and password",
		}});
	}

	try {

		if (user && isValid) {
			const token = jwt.sign(
				{
					username: username,
					id: user.id,
				},
				process.env.JWT_SECRET
			);
			res.send({
				token: token,
				user: user,
				message: "you're logged in!",
			});

			return token;
		} else {
			next(
				{error:{
				name: "IncorrectCredentialsError",
				message: "Username or password is incorrect",
			}});
		}
	} catch (error) {
		next(error);
	}
});

usersRouter.get('/:username', async (req, res, next) => {
const usertoken = req.headers.authorization;
const token = usertoken.split(' ');
const decoded = jwt.verify(token[1], JWT_SECRET);
const username = decoded.username
    try {
        const response = await User.getUserByUsername(username)
		delete response.password
        res.send(response)
    } catch (error) {
        
		console.error(error)
    }
})

module.exports = usersRouter;