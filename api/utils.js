function requireUser(req, res, next) {
    console.log("REQ.USER FROM REQUIREUSER-->", req.user)
    if (!req.user) {
       res.status(401);
        next({
           error: 'Error!',
           name: 'MissingUserError',
           message: 'You must be logged in to perform this action'
        });
     }
     next();
  }

  function requireAdmin(req, res, next) {
     console.log("require", req.user)
    if (!req.user.isAdmin) {
        res.status(401)
        return next({
            error: 'Error!',
            name: 'AdminStatusRequired',
            message: 'You must be an Administrator to complete this action.'
        })
    }
    next();
    console.log("require")
  }
  
  module.exports = {
     requireUser,
     requireAdmin
  };
 