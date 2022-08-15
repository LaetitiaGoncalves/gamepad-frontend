import logo from "../img/logo.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container homepage">
      <div className="logo-and-search">
        <img src={logo} alt="logo de Gamepad" />
        <div className="form-contain">
          <form>
            <input type="search" placeholder="Search for a game " />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
