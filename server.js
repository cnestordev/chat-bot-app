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
var cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local");

const MongoStore = require("connect-mongo");

// ------------------- middleware setup ------------------------------------------------------------------

app.use(express.static(path.join(__dirname, "./client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const store = new MongoStore({
  mongoUrl: "mongodb://127.0.0.1:27017/usersDB",
  secret: "These violent delights have violent ends",
  touchAfter: 24 * 60 * 60,
});

store.on("error", (err) => {
  console.log(err);
});

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
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  chatlog: [{ user: { type: String, required: true }, message: String }],
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

// ------------------- passport setup ------------------------------------------------------------------

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ------------------- routes setup ------------------------------------------------------------------

app.get("/api/getuser", async (req, res) => {
  console.log(req.isAuthenticated());
  console.log(req.user);
  // const username = req.user.username;
  // const user = await User.findOne({ username });
  // res.json({ success: true, user });
  const user = {
    user: "Blinky",
    chatlog: [{ username: "Bot", message: "Welcome" }],
  };
  res.json({ success: true, user });
});

app.post("/api/query", (req, res) => {
  const message = req.body.message;
  axios
    .post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: message,
        temperature: 1,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: [" Human:", " AI:"],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.APIKEY}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const generatedText = response.data.choices[0].text;
      res.json({ success: true, generatedText });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.json({ success: false });
    });
});

app.get("/api/tts", async (req, res) => {
  const { message } = req.query;
  try {
    const response = await axios.get("http://api.voicerss.org/", {
      params: {
        key: process.env.TTSAPIKEY,
        hl: "en-us",
        c: "MP3",
        v: "Mary",
        r: "1",
        src: message,
      },
    });
    const url = response.request.res.req.res.responseUrl;
    const responseObj = { url };
    res.json(responseObj);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating TTS audio." });
  }
});

app.put("/api/updatechatlog", async (req, res) => {
  const { userMessage, botMessage } = req.body;
  try {
    const user = await User.findOne({ username: req.user.username });
    user.chatlog.push({ user: req.user.username, message: userMessage });
    user.chatlog.push({ user: "Bot", message: botMessage });
    await user.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating chat log." });
  }
});

app.post("/api/register", async (req, res) => {
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

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ user });
    });
  })(req, res, next);
});

app.get("/api/logout", (req, res) => {
  req.logout();
  // route somewhere
});

// ------------------------------ end of routes ---------------------------------------------------------------

app.listen(port, () => {
  console.log("listening on port 5000");
});
