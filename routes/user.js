const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/authMiddleware");
const axios = require("axios");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();
const passport = require("passport");

const { BOT, DEFAULT_BOT_MESSAGE } = require("../config/constants");

router.get("/getuser", checkAuth, async (req, res) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ username });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving user data.",
    });
  }
});

router.put("/:id/updatechatlog", checkAuth, async (req, res) => {
  const { chatlog } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { chatlog } },
      { new: true }
    );
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating chat log.",
    });
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
              role: BOT,
              content: DEFAULT_BOT_MESSAGE,
              isMedia: false,
            },
          ],
        },
      },
      { new: true }
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating chat log.",
    });
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
    res.status(500).json({
      status: false,
      message: "An error occurred while deleting the user.",
    });
  }
});

module.exports = router;
