import symbol from "../img/symbol-logo.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import CardOfAGame from "../components/CardOfAGame";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get(
          `https://laetitia-gamepad-backend.herokuapp.com/game?title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      };
      fetchDatas();
    } catch (error) {
      console.log(error.message);
    }
  }, [search]);
  return (
    <div className="container homepage">
      {isLoading === true ? (
        <p>En cours de chargement</p>
      ) : (
        <div>
          <div className="logo-and-search">
            <div className="symbol-and-title">
              <img src={symbol} alt="symbol logo" />
              <h1>Gamepad</h1>
            </div>
            <div className="form-contain">
              <form>
                <input
                  type="search"
                  placeholder="Search for a game "
                  onChange={handleSearch}
                />
                <button type="submit">Search</button>
              </form>
              <p>Search 2349 595 games</p>
            </div>
          </div>
          <div className="games-contain container">
            <h2>New Releases</h2>
            <div className="card-game">
              {data.results.map((game, index) => {
                return (
                  <CardOfAGame game={game} key={index} />
                  //   // composant card => avec state isshown (games en props)
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
