const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const axios = require("axios");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// -----------------------Mongo Database -----------------------------------------------------------------------
// connect to a local mongo server
mongoose.connect("mongodb://127.0.0.1:27017/usersDB");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Something went wrong!"],
  },
  chatlog: [{ user: { type: String, required: true }, message: String }],
});

const User = mongoose.model("User", userSchema);

// const user = new User({
//   user: "Nestor",
//   chatlog: [
//     {
//       user: "bot",
//       message: "Hello. I am a chat bot using OpenAI's API.  Ask me anything.",
//     },
//   ],
// });

// user.save();

// ----------------------------- End of Mongo Data base --------------------------------------------------------------

// -------------------Routes ---------------------------------------------------------------------------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/api/getuser", async (req, res) => {
  const user = await User.findOne({ user: "Nestor" });
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
    const user = await User.findOne({ user: "Nestor" });
    user.chatlog.push(userMessage, botMessage);
    await user.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating chat log." });
  }
});

// ------------------------------ end of routes ---------------------------------------------------------------

app.listen(port, () => {
  console.log("listening on port 5000");
});
