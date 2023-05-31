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
        message.role === BOT ? BOT.toLowerCase() : "user"
      } ${message.isMedia ? "image" : "text"} ${isZoomed ? "zoom" : ""} ${message.hasError ? "error" : ""}`}
    >
      <p className="username">{message.role}</p>
      {message.isMedia ? (
        <img
          className="response-image"
          src={message.content}
          alt="bot generated"
          onClick={() => handleZoom()}
        />
      ) : (
        <p className="response-text">{message.content}</p>
      )}
    </div>
  );
};

export default Bubble;
