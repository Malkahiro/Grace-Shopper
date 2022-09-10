const express = require("express");
const usersRouter = express.Router();
const {
Product
} = require("../db/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

//code here

module.exports = usersRouter;