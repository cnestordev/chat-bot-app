import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import Dashboard from "./Dashboard";
import Menu from "./Menu";

import "../styles/container.css";

const Container = () => {
  // Registered or unregistered user account
  const [user, setUser] = useState(null);
  // track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // username & password for registering or logging in
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // toggle between login and register
  const [toggle, setToggle] = useState(false);
  // when page is loading
  const [isLoading, setIsLoading] = useState(true);
  // stored chatlogs in state
  const [chatlog, setChatlog] = useState([]);
  // when logging in or registering account
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  // error processing authentication
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const anonymousUser = useMemo(
    () => ({
      username: "anon",
      chatlog: [
        {
          username: "Bot",
          message: "Hello! I am a bot. Feel free to ask me anyting!",
        },
      ],
    }),
    []
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/user/getuser");
        if (response.status === 200) {
          setUser(response.data.user);
          setChatlog(response.data.user.chatlog);
          setIsLoggedIn(true);
        } else if (response.status === 204) {
          setIsLoggedIn(false);
          setUser(anonymousUser);
          setChatlog(anonymousUser.chatlog);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getUser();
  }, [anonymousUser]);

  const handleRegistration = () => {
    setIsLoggingIn(true);
    setErrorMessage("");
    setHasError(false);
    const newUser = { username, password };
    axios
      .post("/auth/register", newUser)
      .then((res) => {
        setIsLoggedIn(true);
        setUser(res.data.user);
        setUsername("");
        setPassword("");
        setIsLoggingIn(false);
        setToggle(false);
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
        setErrorMessage(err.response.data.message);
        setHasError(true);
        setIsLoggingIn(false);
        console.log(err);
      });
  };

  const handleLogin = () => {
    setIsLoggingIn(true);
    setErrorMessage("");
    setHasError(false);
    const user = { username, password };
    axios
      .post("/auth/login", user)
      .then((res) => {
        setUser(res.data);
        setChatlog(res.data.chatlog);
        setIsLoggedIn(true);
        setUsername("");
        setPassword("");
        setIsLoggingIn(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setHasError(true);
        setIsLoggingIn(false);
      });
  };

  const handleLogout = () => {
    axios
      .post("/auth/logout")
      .then((res) => {
        setUser(anonymousUser);
        setIsLoggedIn(false);
        setChatlog(anonymousUser.chatlog);
      })
      .catch((err) => {
        setHasError(true);
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
        console.log(updatedChatlogWithUsername);
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

  const handleDeleteChatLog = async () => {
    if (user && user._id) {
      try {
        const response = await axios.put(`/user/${user._id}/deletechatlog`);
        setChatlog(response.data.user.chatlog);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/user/${user._id}/deleteuser`);
      setUser(anonymousUser);
      setIsLoggedIn(false);
      setChatlog(anonymousUser.chatlog);
    } catch (error) {
      console.log(error);
    }
  };

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
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
        isLoggingIn={isLoggingIn}
        setIsLoggingIn={setIsLoggingIn}
        hasError={hasError}
        errorMessage={errorMessage}
        handleDeleteChatLog={handleDeleteChatLog}
        handleDeleteUser={handleDeleteUser}
      />
      <Dashboard userLogs={chatlog} updateChatlog={updateChatlog} />
    </div>
  );
};

export default Container;
