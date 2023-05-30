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
    role: BOT,
    content: url,
    isMedia: true,
  };
  res.status(200).json({ success: true, responseMessage });
});

router.post("/query", (req, res) => {
  let logs = req.body.logs;
  logs.unshift({role: "system", content: "You are a helpful assistant."})
  logs = logs.map(log => {
    return ({
      role: log.role === BOT ? BOT : "user",
      content: log.content
    })
  })
  axios
    .post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: logs,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.APIKEY}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      const generatedText = response.data.choices[0].message.content;
      const responseMessage = {
        role: BOT,
        content: generatedText,
        isMedia: false,
      };
      res.status(200).json({ success: true, responseMessage });
    })
    .catch((error) => {
      console.error("Error:", error.response);
      const responseMessage = {
        role: BOT,
        content: "Something went wrong with the request.",
        isMedia: false,
      };
      res.status(500).json({
        success: false,
        responseMessage,
        error: error.response
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
