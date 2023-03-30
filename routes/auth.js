const express = require("express");
const router = express.Router();
const User = require("../models/User");
require("dotenv").config();
const axios = require("axios");
const passport = require("passport");

router.get("/getuser", async (req, res) => {
  if (!req.user) {
    return res.status(200).json({ message: "NO user is logged in!!" });
  }

  try {
    const username = req.user.username;
    const user = await User.findOne({ username });
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user data." });
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username });
    const newUser = await User.register(user, password);
    await req.login(newUser, (err) => {
      if (err) return next(err);
      const { username, chatlog } = user;
      res.status(201).json({
        data: {
          username,
          chatlog,
        },
        status: 201,
      });
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
      return res.json({ username: user.username, chatlog: user.chatlog });
    });
  })(req, res, next);
});

module.exports = router;
