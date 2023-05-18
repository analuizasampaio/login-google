// Access 'user' variable on templates
function populateUser(req, res, next) {
  if (req.session.passport?.user) {
    res.locals.user = req.session.passport.user;
  }
  return next();
}

module.exports = populateUser;
