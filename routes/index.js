const express = require("express");
const router = express.Router();

const apiRouter = require("./api");
const authRouter = require("./auth");
const userRouter = require("./user");

router.use("/api", apiRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
