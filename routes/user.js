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
  console.log(req.body.chatlog);
  const { chatlog } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { chatlog } },
      { new: true }
    );
    console.log(user);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating chat log." });
  }
});

router.put("/:id/deletechatlog", checkAuth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          chatlog: [
            {
              username: "Bot",
              message: "Hello! I am a bot. Feel free to ask me anything!",
            },
          ],
        },
      },
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

router.delete("/:id/deleteuser", checkAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
});

module.exports = router;
