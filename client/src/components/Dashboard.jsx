import React, { useState } from "react";
import "../styles/dashboard.css";
import Body from "./Body";
import Header from "./Header";
import Input from "./Input";
import AppContext from "../context/AppContext";
import axios from "axios";

const Dashboard = ({ userLogs, updateChatlog, user }) => {
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isMute, setIsMute] = useState(true);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    setInputValue(event.target.value);
  };

  const handleEnterPressed = async () => {
    const userMessage = {
      message: message,
      username: user.username,
    };
    await updateChatlog(userMessage);
    setMessage("");
    setInputValue("");
    axios
      .post("/api/query", { message })
      .then((response) => {
        console.log(response.data);
        const resMessage = {
          message: response.data.generatedText,
          username: "Bot",
        };
        updateChatlog(resMessage);
        tts(resMessage.message);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        const resMessage = {
          message: error.response.data.message,
          username: "Bot",
        };
        updateChatlog(resMessage);
        setMessage("");
        setInputValue("");
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
      <div className="dashboard-container">
        <Header isMute={isMute} toggleMute={setIsMute} />
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
