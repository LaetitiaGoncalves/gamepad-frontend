import { useState, useEffect } from "react";
import axios from "axios";
import microsoft from "../img/microsoft1.svg";
import playstation from "../img/playstation-logotype.svg";
import xbox from "../img/xbox-logo.svg";
import nintendo from "../img/nintendo-switch.svg";

const GameCard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get("http://localhost:3000/home");
        setData(response.data);
        setIsLoading(false);
      };
      fetchDatas();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="container">
      {isLoading === true ? (
        <h2>En cours de chargment</h2>
      ) : (
        <div className="card-game">
          {data.results.map((games) => {
            return (
              <div className="game-card">
                <img src={games.background_image} alt="" />
                <div className="game-infos">
                  <div className="platform">
                    {games.platforms.map((platform) => {
                      if (platform.platform.name === "PC") {
                        return <img src={microsoft} alt="microsoft-logo" />;
                      } else if (
                        platform.platform.name ===
                        ("PlayStation 5" || "PlayStation 4" || "PlayStation")
                      ) {
                        return <img src={playstation} alt="playstation-logo" />;
                      } else if (
                        platform.platform.name ===
                        ("Xbox One" || "Xbox Series S/X" || "Xbox")
                      ) {
                        return <img src={xbox} alt="xbox-logo" />;
                      } else if (platform.platform.name === "Nintendo Switch") {
                        return <img src={nintendo} alt="switch-logo" />;
                      }
                    })}
                  </div>
                  <div>
                    {games.metacritic ? (
                      <p className="metascore">{games.metacritic}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <h3>{games.name}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default GameCard;
