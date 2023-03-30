const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");
const authRouter = require("./routes/auth");
const apiRouter = require("./routes/api");
const User = require("./models/User");
const store = require("./config/mongoStore");

// ------------------- middleware setup ------------------------------------------------------------------

app.use(express.static(path.join(__dirname, "./client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    store,
    name: "pfil",
    secret: "These violent delights have violent ends",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(cookieParser("These violent delights have violent ends"));
app.use(passport.initialize());
app.use(passport.session());

// ------------------- mongoose setup ------------------------------------------------------------------

mongoose.connect("mongodb://127.0.0.1:27017/usersDB", {
  useNewUrlParser: true,
});

// ------------------- passport setup ------------------------------------------------------------------

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ------------------- routes setup ------------------------------------------------------------------

app.use("/api", apiRouter);
app.use("/auth", authRouter);

// ------------------------------ end of routes ---------------------------------------------------------------

app.listen(port, () => {
  console.log("listening on port 5000");
});
