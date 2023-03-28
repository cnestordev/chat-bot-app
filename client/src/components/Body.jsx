import { useEffect, useRef } from "react";
import "../styles/body.css";

import Bubble from "./Bubble";

const Body = ({ messages }) => {
  const bodyRef = useRef(null);
  useEffect(() => {
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="body-container" ref={bodyRef}>
      {messages.map((message, index) => (
        <Bubble key={index} message={message} />
      ))}
    </div>
  );
};

export default Body;
