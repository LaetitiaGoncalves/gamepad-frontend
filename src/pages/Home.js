import symbol from "../img/symbol-logo.svg";
import GameCard from "../components/GameCard";

const Home = () => {
  return (
    <div className="container homepage">
      <div className="logo-and-search">
        <div className="symbol-and-title">
          <img src={symbol} alt="symbol logo" />
          <h1>Gamepad</h1>
        </div>
        <div className="form-contain">
          <form>
            <input type="search" placeholder="Search for a game " />
            <button type="submit">Search</button>
          </form>
          <p>Search 2349 595 games</p>
        </div>
      </div>
      <div className="games-contain container">
        <h2>New Releases</h2>
        <div>
          <GameCard />
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
