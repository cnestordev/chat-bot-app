const express = require("express");
const router = express.Router();
const User = require("../models/User");
require("dotenv").config();
const axios = require("axios");
const passport = require("passport");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username });
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(201).json({ user: newUser });
    });
  } catch (err) {
    res.status(401).json({ message: err.message, status: 401 });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        username: user.username,
        chatlog: user.chatlog,
        _id: user._id,
      });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err)
      return res
        .status(500)
        .json({ message: "something went wrong with logging you out" });
    res.status(204).json({ message: "successfully logged out" });
  });
});

module.exports = router;
