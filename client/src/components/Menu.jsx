import "../styles/menu.css";

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
}) => {
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
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
                Login
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
          <button className="user-btns delete-convo">Delete convo</button>
          <button className="user-btns delete-account">Delete account</button>
          <button
            onClick={() => handleLogout()}
            className="user-btns user-logout"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="menu-body">
        Sign in or create an account to save your chat history.
      </div>
    </div>
  );
};

export default Menu;
