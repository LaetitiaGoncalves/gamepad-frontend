import logo from "../img/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ token, setUser }) => {
  return (
    <header>
      <div className="container header-contain">
        <Link to="/">
          <img src={logo} alt="logo de Gamepad" className="logo-header" />
        </Link>
        <div className="header-links">
          {token === null ? (
            <div className="connect">
              <Link to="/login">
                <button className="login-button">Login</button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/collection">
                <p>My collection</p>
              </Link>
              <Link to="/">
                <button
                  onClick={() => {
                    setUser(null);
                  }}
                  className="deconnexion-button"
                >
                  Se déconnecter
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
