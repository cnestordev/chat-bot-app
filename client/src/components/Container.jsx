import axios from "axios";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Menu from "./Menu";

import "../styles/container.css";

const Container = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/api/getuser");
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const updateChatlog = async (userMessage, botMessage) => {
    try {
      const response = await axios.put("/api/updatechatlog", {
        userMessage,
        botMessage,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="main-container">
      <Menu />
      <Dashboard userLogs={user.chatlog} updateChatlog={updateChatlog} />;
    </div>
  );
};

export default Container;
