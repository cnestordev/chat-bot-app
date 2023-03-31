const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("Middleware: user is authed");
    next();
  } else {
    console.log("Middlware: no user is authed");
    res.status(204).json({ message: "No user is logged in" });
  }
};

module.exports = checkAuth;
