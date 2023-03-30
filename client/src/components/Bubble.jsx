import "../styles/bubble.css";

const Bubble = ({ message }) => {
  return (
    <div
      className={`bubble-container ${
        message.username === "Bot" ? "bot" : "user"
      }`}
    >
      <p className="username">{message.username}</p>
      <p className="response-text">{message.message}</p>
    </div>
  );
};

export default Bubble;
