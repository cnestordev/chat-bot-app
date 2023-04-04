import "../styles/bubble.css";
import { BOT } from "../config/constants";

const Bubble = ({ message }) => {
  console.log(message);
  return (
    <div
      className={`bubble-container ${
        message.username === BOT ? BOT.toLowerCase() : "user"
      } ${message.isMedia ? "image" : "text"}`}
    >
      <p className="username">{message.username}</p>
      {message.isMedia ? (
        <img
          className="response-image"
          src={message.message}
          alt="bot generated"
        />
      ) : (
        <p className="response-text">{message.message}</p>
      )}
    </div>
  );
};

export default Bubble;
