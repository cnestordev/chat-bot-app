import "../styles/menu.css";
import axios from "axios";
import { useState } from "react";

const Menu = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleRegistration = () => {
    const newUser = { username, password };
    axios
      .post("/api/register", newUser)
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
      .post("/api/login", user)
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

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h3>Sign in</h3>
        <div className="sign-in-container">
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
              <button onClick={() => handleLogin()}>Login</button>
              <span onClick={() => handleToggle()} className="info">
                Register an account
              </span>
            </>
          )}
        </div>
      </div>
      <div className="menu-body">
        Sign in or create an account to save your chat history.
      </div>
    </div>
  );
};

export default Menu;
