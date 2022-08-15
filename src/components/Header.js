import logo from "../img/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container header-contain">
        <img src={logo} alt="logo de Gamepad" className="logo-header" />
        <div className="header-links">
          <Link to="/collection">
            <p>My collection</p>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
