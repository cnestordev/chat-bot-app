import axios from "axios";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Menu from "./Menu";

import "../styles/container.css";

const Container = () => {
  const [user, setUser] = useState({
    chatlog: [{ username: "Bot", message: "Hello" }],
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/auth/getuser");
        if (response.data.user) {
          console.log(response.data.user);
          setUser(response.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const handleRegistration = () => {
    const newUser = { username, password };
    axios
      .post("/auth/register", newUser)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    const user = { username, password };
    axios
      .post("/auth/login", user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

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
      <Menu
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        toggle={toggle}
        handleLogin={handleLogin}
        handleRegistration={handleRegistration}
        handleToggle={handleToggle}
      />
      <Dashboard userLogs={user.chatlog} updateChatlog={updateChatlog} />
    </div>
  );
};

export default Container;
