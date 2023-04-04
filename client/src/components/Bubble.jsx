import { useState } from "react";
import "../styles/bubble.css";
import { BOT } from "../config/constants";

const Bubble = ({ message }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div
      className={`bubble-container ${
        message.username === BOT ? BOT.toLowerCase() : "user"
      } ${message.isMedia ? "image" : "text"} ${isZoomed ? "zoom" : ""}`}
    >
      <p className="username">{message.username}</p>
      {message.isMedia ? (
        <img
          className="response-image"
          src={message.message}
          alt="bot generated"
          onClick={() => handleZoom()}
        />
      ) : (
        <p className="response-text">{message.message}</p>
      )}
    </div>
  );
};

export default Bubble;
