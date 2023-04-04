import "../styles/bubble.css";
import { BOT } from "../config/constants";

const Bubble = ({ message }) => {
  return (
    <div
      className={`bubble-container ${
        message.username === BOT ? BOT.toLowerCase() : "user"
      }`}
    >
      <p className="username">{message.username}</p>
      <p className="response-text">{message.message}</p>
    </div>
  );
};

export default Bubble;
