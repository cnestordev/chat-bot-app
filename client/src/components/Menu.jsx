import "../styles/menu.css";

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="menu-header">
        <h3>Sign in</h3>
        <div className="sign-in-container">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button>Login</button>
        </div>
      </div>
      <div className="menu-body">
        Sign in or create an account to save your chat history.
      </div>
    </div>
  );
};

export default Menu;
