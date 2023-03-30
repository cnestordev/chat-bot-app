const express = require("express");
const router = express.Router();

router.post("/api/query", (req, res) => {
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

router.get("/api/tts", async (req, res) => {
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

router.put("/api/updatechatlog", async (req, res) => {
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

router.get("/api/logout", (req, res) => {
  req.logout();
  // route somewhere
});

module.exports = router;
