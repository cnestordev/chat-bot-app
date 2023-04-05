import "../styles/auth.css";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Auth = ({
  isLoggedIn,
  username,
  setUsername,
  passwordVisible,
  password,
  setPassword,
  handleTogglePassword,
  toggle,
  isLoggingIn,
  handleToggle,
  handleLogin,
  hasError,
  errorMessage,
  handleRegistration,
  handleDeleteUser,
  handleDeleteChatLog,
  handleLogout,
}) => {
  return (
    <div className="auth-container">
      <div className={`auth-header ${isLoggedIn ? "hidden" : ""}`}>
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
          <div className={`menu-error ${hasError ? "" : "hidden"}`}>
            {errorMessage}
          </div>
        </div>
      </div>
      <div
        className={`auth-body account-settings ${!isLoggedIn ? "hidden" : ""}`}
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
  );
};

export default Auth;
