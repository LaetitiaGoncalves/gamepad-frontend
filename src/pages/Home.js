import symbol from "../img/symbol-logo.svg";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import CardOfAGame from "../components/CardOfAGame";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [page, setPage] = useState(1);

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://laetitia-gamepad-backend.herokuapp.com/game?page=${page}`
      );
      setData(response.data);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };
  const previewsPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleFilter = (event) => {
    try {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = data.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
        setFilteredData([]);
        setPage(1);
      } else {
        setPage(1);
        setFilteredData(newFilter);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get(
          `https://laetitia-gamepad-backend.herokuapp.com/game?page=${page}&search=${wordEntered}`
        );
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setData(response.data);
        setIsLoading(false);
      };
      fetchDatas();
    } catch (error) {
      console.log(error.message);
    }
  }, [page, wordEntered]);

  return (
    <div className="container homepage">
      {isLoading === true ? (
        <p className="loading">
          Vos jeux sont en cours de chargement, patience !
        </p>
      ) : (
        <div>
          <div className="logo-and-search">
            <div className="symbol-and-title">
              <img src={symbol} alt="symbol logo" />
              <h1 id="top-page">Gamepad</h1>
            </div>
            <div className="form-contain">
              <form>
                <input
                  type="text"
                  placeholder="Search for a Game..."
                  value={wordEntered}
                  onChange={handleFilter}
                />
              </form>
              <p>Search 2349 595 games</p>
            </div>
          </div>
          <div className="games-contain container">
            <h2>Most Relevance Games</h2>
            {filteredData.length !== 0 ? (
              <div className="card-game">
                {filteredData.slice(0, 15).map((game, index) => {
                  return <CardOfAGame game={game} key={index} />;
                })}
              </div>
            ) : (
              <div className="card-game">
                {data.map((game, index) => {
                  return <CardOfAGame game={game} key={index} />;
                })}
              </div>
            )}
          </div>
          <div className="pagination">
            <button onClick={previewsPage} onSubmit={handleSubmit}>
              <FontAwesomeIcon
                icon="fa-regular fa-circle-left"
                style={{ color: "#FF4655", fontSize: "20" }}
              />
            </button>
            <p>Page {page} </p>
            <button onClick={nextPage} onSubmit={handleSubmit}>
              <FontAwesomeIcon
                icon="fa-regular fa-circle-right"
                style={{ color: "#FF4655", fontSize: "20" }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
