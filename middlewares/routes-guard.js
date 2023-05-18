function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // continue the request flow
    return next();
  }

  // Redirect to home to login first
  res.redirect("/");
}

module.exports = isAuthenticated;
