const express = require("express");
const usersRouter = express.Router();
const {
User
} = require("../db/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

// code here

usersRouter.post("/register", async (req, res, next) => {
	const { username, password } = req.body;

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

		const user = await User.createUser({ username, password });

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

module.exports = usersRouter;