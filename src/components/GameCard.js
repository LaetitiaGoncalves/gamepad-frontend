import { useState, useEffect } from "react";
import axios from "axios";
import microsoft from "../img/microsoft1.svg";
import playstation from "../img/playstation-logotype.svg";
import xbox from "../img/xbox-logo.svg";
import nintendo from "../img/nintendo-switch.svg";
import linux from "../img/linux-logo.svg";
import { useNavigate } from "react-router-dom";

const GameCard = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get(
          "https://laetitia-gamepad-backend.herokuapp.com/game"
        );
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
          {data.results.map((games, index) => {
            return (
              <div
                className="game-card"
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(`/game/${games.id}`);
                }}
              >
                <img src={games.background_image} alt="" />
                <div className="game-infos">
                  <div className="platform">
                    {games.platforms.map((platform, index) => {
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
                      } else if (platform.platform.name === "Linux") {
                        return <img src={linux} alt="linux logo" />;
                      }
                      return console.log(platform);
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
                {isShown && (
                  <div className="card-opened">
                    <div>
                      <p style={{ color: "#797979", fontSize: "14px" }}>
                        Released date :
                      </p>
                      <p style={{ color: "white", fontSize: "14px" }}>
                        {games.released}
                      </p>
                    </div>
                    <div className="genres">
                      <p style={{ color: "#797979", fontSize: "14px" }}>
                        Genres :
                      </p>
                      <div>
                        {games.genres.map((genre, index) => {
                          return (
                            <p
                              key={index}
                              style={{ color: "white", fontSize: "14px" }}
                            >
                              {genre.name}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default GameCard;
