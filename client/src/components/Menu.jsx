import { useState } from "react";
import "../styles/menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

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

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <FontAwesomeIcon className="icon" icon={faUserCircle} />
        <h3>{isLoggedIn ? user.username : "Sign in"}</h3>
      </div>
      <div className="menu-body">
        <div className="input-field username-input">
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-field password-input">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-field"
            maxLength={15}
          />
          <FontAwesomeIcon
            className="icon"
            icon={passwordVisible ? faEyeSlash : faEye}
            onClick={handleTogglePassword}
          />
        </div>
        <div className="login-btns">
          {toggle ? (
            <>
              <button onClick={() => handleRegistration()}>
                <span
                  className={`dot-elastic ${isLoggingIn ? "" : "hidden"}`}
                ></span>
                <span className={`${isLoggingIn ? "hidden" : ""}`}>
                  Register
                </span>
              </button>
              <span onClick={() => handleToggle()} className="info">
                Create a new account
              </span>
            </>
          ) : (
            <>
              <button onClick={() => handleLogin()}>
                <span
                  className={`dot-elastic ${isLoggingIn ? "" : "hidden"}`}
                ></span>
                <span className={`${isLoggingIn ? "hidden" : ""}`}>Login</span>
              </button>
              <span onClick={() => handleToggle()} className="info">
                Log into existing account
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
