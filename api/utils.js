function requireUser(req, res, next) {
    if (!req.user) {
       res.status(401);
        return next({
           error: 'Error!',
           name: 'MissingUserError',
           message: 'You must be logged in to perform this action'
        });
     }
     next();
  }

  function requireAdmin(req, res, next) {
    if (!req.user.isAdmin) {
        res.status(401)
        return next({
            error: 'Error!',
            name: 'AdminStatusRequired',
            message: 'You must be an Administrator to complete this action.'
        })
    }
    next();
  }
  
  module.exports = {
     requireUser,
     requireAdmin
  };
 