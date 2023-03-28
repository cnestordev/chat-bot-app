import "../styles/bubble.css";

const Bubble = ({ message }) => {
  return (
    <div
      className={`bubble-container ${message.user === "Bot" ? "bot" : "user"}`}
    >
      <p className="username">{message.user}</p>
      <p className="response-text">{message.message}</p>
    </div>
  );
};

export default Bubble;
