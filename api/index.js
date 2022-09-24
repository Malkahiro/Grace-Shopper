const {
  User
  } = require("../db/index");
const apiRouter = require('express').Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { username } = jwt.verify(token, JWT_SECRET);

      if (username ) {
        req.user = await User.getUserByUsername(username);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

// place your routers here

const usersRouter = require("./users")
apiRouter.use("/users", usersRouter)

const productsRouter = require("./products");

apiRouter.use("/products", productsRouter)

const cartsRouter = require("./shopping_cart")
apiRouter.use("/shopping_cart", cartsRouter)

module.exports = apiRouter;
