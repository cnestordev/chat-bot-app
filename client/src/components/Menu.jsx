import { useState } from "react";
import "../styles/menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
        <h3>{isLoggedIn ? user.username : "Sign in"}</h3>
        <div className={`sign-in-container ${isLoggedIn ? "hidden" : ""}`}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="password-container">
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
          </span>
          {toggle ? (
            <>
              <button onClick={() => handleRegistration()}>Register</button>
              <span onClick={() => handleToggle()} className="info">
                Log into existing account
              </span>
            </>
          ) : (
            <>
              <button className="auth-btns" onClick={() => handleLogin()}>
                <div
                  className={`dot-elastic ${isLoggingIn ? "" : "hidden"}`}
                ></div>
                <span
                  className={`${isLoggingIn ? "hidden" : ""}`}
                  onClick={() => setIsLoggingIn(true)}
                >
                  Login
                </span>
              </button>
              <span onClick={() => handleToggle()} className="info">
                Register an account
              </span>
            </>
          )}
        </div>
        <div
          className={`sign-in-container user-btns-container ${
            !isLoggedIn ? "hidden" : ""
          }`}
        >
          <button
            onClick={() => handleDeleteChatLog()}
            className="user-btns delete-convo"
          >
            Delete convo
          </button>
          <button
            onClick={() => handleDeleteUser()}
            className="user-btns delete-account"
          >
            Delete account
          </button>
          <button
            onClick={() => handleLogout()}
            className="user-btns user-logout"
          >
            Logout
          </button>
        </div>
      </div>
      <div className={`menu-error ${hasError ? "" : "hidden"}`}>
        {errorMessage}
      </div>
    </div>
  );
};

export default Menu;
