import { useState } from "react";
import "../styles/menu.css";

import chatIcon from "../assets/chat.png";
import imageIcon from "../assets/photo.png";
import userIcon from "../assets/anon.png";
import gearIcon from "../assets/gear.png";
import Auth from "./Auth";

const Menu = ({
  username,
  password,
  setUsername,
  setPassword,
  toggle,
  handleLogin,
  handleRegistration,
  handleToggle,
  isLoggedIn,
  user,
  handleLogout,
  isLoggingIn,
  setIsLoggingIn,
  hasError,
  errorMessage,
  handleDeleteChatLog,
  handleDeleteUser,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [visibleSettings, setVisibleSettings] = useState(false);

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="menu-container">
        <div className="menu-header">
          <h3>Sign in chatbot</h3>
          <div className="header-actions">
            <div
              onClick={() => setVisibleSettings(!visibleSettings)}
              className="header-action"
            >
              <img clas src={userIcon} alt="user" />
              <span>{isLoggedIn ? user.username : "Sign in"}</span>
            </div>
          </div>
          <div className={`login-container ${visibleSettings ? "hidden" : ""}`}>
            <Auth
              isLoggedIn={isLoggedIn}
              username={username}
              setUsername={setUsername}
              passwordVisible={passwordVisible}
              password={password}
              setPassword={setPassword}
              handleTogglePassword={handleTogglePassword}
              toggle={toggle}
              isLoggingIn={isLoggingIn}
              handleToggle={handleToggle}
              handleLogin={handleLogin}
              hasError={hasError}
              errorMessage={errorMessage}
              handleRegistration={handleRegistration}
              handleDeleteChatLog={handleDeleteChatLog}
              handleDeleteUser={handleDeleteUser}
              handleLogout={handleLogout}
            />
          </div>
          <hr />
        </div>
        <div className="menu-body">
          <div className="body-card">
            <div className="card-header">
              <img src={chatIcon} alt="user" />
              <span uk-icon="icon: check"></span>
              <h3>Ask chatbot anything</h3>
            </div>
            <div className="card-body">
              <span>
                Chat with OpenAI's AI-powered chatbot and get quick answers to
                your questions! However, please note that the bot may not always
                be accurate and does not have direct access to the internet.
              </span>
            </div>
          </div>
          <div className="body-card">
            <div className="card-header">
              <img src={imageIcon} alt="user" />
              <h3>AI generated images</h3>
            </div>
            <div className="card-body">
              <span>
                Start your prompt with "generate" or "create", you can ask our
                chatbot to generate any image you desire. Keep in mind that the
                chatbot cannot access the internet directly and may not always
                produce the exact result you were expecting.
              </span>
            </div>
          </div>
          <hr />
        </div>
        <div className="menu-footer">
          <div
            onClick={() => setVisibleSettings(!visibleSettings)}
            className="footer-user"
          >
            <img src={gearIcon} alt="user" />
            <span>{isLoggedIn ? user.username : "anon"}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
