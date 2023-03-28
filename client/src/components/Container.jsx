import React, { useState } from "react";
import "../styles/container.css";
import Body from "./Body";
import Header from "./Header";
import Input from "./Input";
import AppContext from "../context/AppContext";
import axios from "axios";

const Container = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isMute, setIsMute] = useState(true);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    setInputValue(event.target.value);
  };

  const handleEnterPressed = () => {
    const userMessage = { message, user: "user" };
    setMessageList([...messageList, userMessage]);
    setMessage("");
    axios
      .post("/api/messages", { message })
      .then((response) => {
        const resMessage = {
          message: response.data.generatedText,
          user: "Bot",
        };
        setMessageList([...messageList, userMessage, resMessage]);
        setInputValue("");
        tts(resMessage.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const tts = async (message) => {
    try {
      const response = await axios.get("/api/tts", { params: { message } });
      setAudioUrl(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider value={{ message, setMessage }}>
      <div className="main-container">
        <Header isMute={isMute} toggleMute={setIsMute} />
        <Body messages={messageList} />
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

export default Container;
