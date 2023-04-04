const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/authMiddleware");
const axios = require("axios");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const { BOT } = require("../config/constants");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.APIKEY,
});
const openai = new OpenAIApi(configuration);

router.post("/image-query", async (req, res) => {
  const message = req.body.message;
  const response = await openai.createImage({
    prompt: message,
    n: 1,
    size: "1024x1024",
  });
  const url = response.data.data[0].url;
  const responseMessage = {
    username: BOT,
    message: url,
    isMedia: true,
  };
  res.status(200).json({ success: true, responseMessage });
});

router.post("/query", (req, res) => {
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
      const responseMessage = {
        username: BOT,
        message: generatedText,
        isMedia: false,
      };
      res.status(200).json({ success: true, responseMessage });
    })
    .catch((error) => {
      console.error("Error:", error.response);
      const responseMessage = {
        username: BOT,
        message: "Something went wrong with the request.",
        isMedia: false,
      };
      res.status(500).json({
        success: false,
        responseMessage,
      });
    });
});

router.get("/tts", async (req, res) => {
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
    res.status(200).json({ success: true, responseObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating TTS audio.",
    });
  }
});

module.exports = router;
