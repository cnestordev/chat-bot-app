const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/authMiddleware");
const axios = require("axios");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();
const passport = require("passport");

router.get("/getuser", checkAuth, async (req, res) => {
  if (!req.user) {
    return res.status(200).json({ message: "NO user is logged in!!" });
  }

  try {
    const username = req.user.username;
    const user = await User.findOne({ username });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving user data." });
  }
});

router.put("/:id/updatechatlog", checkAuth, async (req, res) => {
  const { chatlog } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { chatlog: { $each: chatlog } } },
      { new: true }
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating chat log." });
  }
});

module.exports = router;
