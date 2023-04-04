import React, { useState } from "react";
import "../styles/dashboard.css";
import Body from "./Body";
import Header from "./Header";
import Input from "./Input";
import AppContext from "../context/AppContext";
import axios from "axios";

const Dashboard = ({
  userLogs,
  updateChatlog,
  user,
  handleMenuToggle,
  isMenuOpen,
}) => {
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isMute, setIsMute] = useState(true);
  const [isImagePrompt, setIsImagePrompt] = useState(false);

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setMessage(inputText);
    setInputValue(inputText);
    const firstWord = inputText.split(" ")[0];
    setIsImagePrompt(firstWord.toLowerCase() === "generate");
  };

  const handleEnterPressed = async () => {
    const userMessage = {
      message: message,
      username: user.username,
      isMedia: isImagePrompt,
    };
    await updateChatlog(userMessage);
    setMessage("");
    setInputValue("");
    if (!isImagePrompt) {
      console.log("Text");
      axios
        .post("/api/query", { message })
        .then((response) => {
          updateChatlog(response.data.responseMessage);
          tts(response.data.responseMessage.message);
        })
        .catch((error) => {
          console.log(error.response.data.responseMessage);
          updateChatlog(error.response.data.responseMessage);
          setMessage("");
          setInputValue("");
        });
    } else {
      console.log("image");
      axios
        .post("/api/image-query", { message })
        .then((response) => {
          console.log(response.data.data[0].url);
          // const imageUrl = response.data.data[0].url;
          // // const resMessage = {
          // //   message: imageUrl,
          // //   username: "Bot",
          // // };
          // updateChatlog(resMessage);
          // tts(resMessage.message);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          // const resMessage = {
          //   message: error.response.data.message,
          //   username: "Bot",
          // };
          // updateChatlog(resMessage);
          // setMessage("");
          // setInputValue("");
        });
    }
  };

  const tts = async (message) => {
    try {
      const response = await axios.get("/api/tts", { params: { message } });
      setAudioUrl(response.data.responseObj.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider value={{ message, setMessage }}>
      <div className="dashboard-container">
        <Header
          handleMenuToggle={handleMenuToggle}
          isMenuOpen={isMenuOpen}
          isMute={isMute}
          toggleMute={setIsMute}
        />
        <Body messages={userLogs} />
        <Input
          value={inputValue}
          onInputChange={handleInputChange}
          onEnterPressed={handleEnterPressed}
        />

        {audioUrl && (
          <audio controls autoPlay muted={isMute}>
            <source src={audioUrl} type="audio/mpeg" />
          </audio>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default Dashboard;
