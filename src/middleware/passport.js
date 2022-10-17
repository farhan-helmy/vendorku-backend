function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect("/api/v1/auth/unauthorized")
}

module.exports = {
  isAuthenticated,
};
