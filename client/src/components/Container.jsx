import axios from "axios";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Menu from "./Menu";

import "../styles/container.css";

const Container = () => {
  // Registered or unregistered user account
  const [user, setUser] = useState(null);
  // username & password for registering or logging in
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // toggle between login and register
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // stored chatlogs in state
  const [chatlog, setChatlog] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/user/getuser");
        if (response.status === 200) {
          console.log(response.data.user);
          setUser(response.data.user);
          setChatlog(response.data.user.chatlog);
        } else if (response.status === 204) {
          const anonymousUser = {
            username: "anon",
            chatlog: [
              {
                username: "Bot",
                message: "Hello! I am a bot. Feel free to ask me anyting!",
              },
            ],
          };
          setUser(anonymousUser);
          setChatlog(anonymousUser.chatlog);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getUser();
  }, []);

  const handleRegistration = () => {
    const newUser = { username, password };
    axios
      .post("/auth/register", newUser)
      .then((res) => {
        const newUserId = res.data.user._id;
        axios
          .put(`/user/${newUserId}/updatechatlog`, {
            chatlog: chatlog,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
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
        setUser(res.data);
        setChatlog(res.data.chatlog);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const updateChatlog = async (userMessage, botMessage) => {
    const updatedChatlog = [
      ...chatlog,
      { username: user.username, message: userMessage.message },
      { username: "Bot", message: botMessage.message },
    ];

    setChatlog(updatedChatlog);

    if (user && user._id) {
      try {
        // Replace "anonymous" with the user's chosen username
        const updatedChatlogWithUsername = updatedChatlog.map((entry) => {
          if (entry.username === "anonymous" && user.username) {
            entry.username = user.username;
          }
          return entry;
        });

        const response = await axios.put(`/user/${user._id}/updatechatlog`, {
          chatlog: updatedChatlogWithUsername,
        });
        console.log(response);
        setChatlog(response.data.user.chatlog);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const updateChatlog = async (userMessage, botMessage) => {
  //   const updatedChatlog = [
  //     ...chatlog,
  //     { username: user.username, message: userMessage.message },
  //     { username: "Bot", message: botMessage.message },
  //   ];

  //   setChatlog(updatedChatlog);

  //   if (user && user._id) {
  //     try {
  //       const response = await axios.put(`/user/${user._id}/updatechatlog`, {
  //         chatlog: updatedChatlog,
  //       });
  //       console.log(response);
  //       setChatlog(response.data.user.chatlog);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  if (isLoading) {
    return <div>Loading...</div>;
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
      <Dashboard userLogs={chatlog} updateChatlog={updateChatlog} />
    </div>
  );
};

export default Container;
