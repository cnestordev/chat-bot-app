import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import Dashboard from "./Dashboard";
import Menu from "./Menu";

import "../styles/container.css";
import { BOT, DEFAULT_BOT_MESSAGE } from "../config/constants";

import { useSelector, useDispatch } from "react-redux";
import { login, updateChatlog } from "../redux/rootReducer";

const Container = () => {
  const dispatch = useDispatch();
  // Registered or unregistered user account
  const user = useSelector((state) => state.user);
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
  // mobile nav
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const anonymousUser = useMemo(
    () => ({
      role: "user",
      chatlog: [
        {
          role: BOT,
          content: DEFAULT_BOT_MESSAGE,
          isMedia: false,
        },
      ],
      isMedia: false,
    }),
    []
  );

  useEffect(() => {
    console.log("checking user status");
    const getUser = async () => {
      try {
        const response = await axios.get("/user/getuser");
        if (response.status === 200) {
          console.log(response.data.user)
          dispatch(login(response.data.user));
          setChatlog(response.data.user.chatlog);
          setIsLoggedIn(true);
        } else if (response.status === 204) {
          setIsLoggedIn(false);
          const { payload } = await dispatch(login(anonymousUser));
          setChatlog(payload.chatlog);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRegistration = () => {
    setIsLoggingIn(true);
    setErrorMessage("");
    setHasError(false);
    const newUser = { username, password };
    axios
      .post("/auth/register", newUser)
      .then(async (res) => {
        setIsLoggedIn(true);
        const { payload } = dispatch(login(res.data.newUserObj));
        setUsername("");
        setPassword("");
        setIsLoggingIn(false);
        setToggle(false);
        const newUserId = payload._id;
        const newUsername = payload.username;
        const updatedChatlogWithUsername = addUsernameToChatlogs(
          chatlog,
          newUsername
        );
        axios
          .put(`/user/${newUserId}/updatechatlog`, {
            chatlog: updatedChatlogWithUsername,
          })
          .then((res) => {
            setChatlog(res.data.user.chatlog);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setHasError(true);
        setIsLoggingIn(false);
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
        const { payload } = dispatch(login(res.data.signedInUser));
        setChatlog(payload.chatlog);
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
        const { payload } = dispatch(login(anonymousUser));
        setIsLoggedIn(false);
        setChatlog(payload.chatlog);
      })
      .catch((err) => {
        setHasError(true);
        console.log(err);
      });
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  // Replace "anonymous" with the user's chosen username
  const addUsernameToChatlogs = (updatedChatlog, username) => {
    const updatedChatlogWithUsername = updatedChatlog.map((entry) => {
      if (entry.username === "user") {
        entry.role = username;
      }
      return entry;
    });
    return updatedChatlogWithUsername;
  };

  const updateChatlogDatabase = (newMessage) => {
    console.log("%c ############################", "color: gold")
    console.log(newMessage)
    console.log("%c ############################", "color: gold")
    return new Promise((resolve) => {
      setChatlog((prevChatlog) => {
        const updatedChatlog = [
          ...prevChatlog,
          {
            role: newMessage.role,
            content: newMessage.content,
            isMedia: newMessage.isMedia,
          },
        ];

        console.log("%c ########################")
        console.log(updatedChatlog)
        console.log("%c ########################")

        if (user && user._id) {
          try {
            axios
              .put(`/user/${user._id}/updatechatlog`, {
                chatlog: updatedChatlog,
              })
              .then(() => {
                resolve(updatedChatlog);
              })
              .catch((error) => {
                console.error(error);
                resolve();
              });
          } catch (error) {
            console.error(error);
            resolve();
          }
        } else {
          resolve(updatedChatlog);
        }

        return updatedChatlog;
      });
    });
  };

  const handleDeleteChatLog = async () => {
    if (user && user._id) {
      try {
        const response = await axios.put(`/user/${user._id}/deletechatlog`);
        const { payload } = dispatch(updateChatlog(response.data.user.chatlog));
        setChatlog(payload);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/user/${user._id}/deleteuser`);
      const { payload } = dispatch(login(anonymousUser));
      setIsLoggedIn(false);
      setChatlog(payload.chatlog);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <div className={`left ${isMenuOpen ? "active" : "inactive"}`}>
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
      </div>
      <div className="right">
        <Dashboard
          user={user}
          userLogs={chatlog}
          updateChatlogDatabase={updateChatlogDatabase}
          handleMenuToggle={handleMenuToggle}
          isMenuOpen={isMenuOpen}
        />
      </div>
    </div>
  );
};

export default Container;
