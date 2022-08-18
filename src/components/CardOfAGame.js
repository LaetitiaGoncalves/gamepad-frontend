import { useState, useEffect } from "react";
import axios from "axios";
import microsoft from "../img/microsoft1.svg";
import playstation from "../img/playstation-logotype.svg";
import xbox from "../img/xbox-logo.svg";
import nintendo from "../img/nintendo-switch.svg";
import linux from "../img/linux-logo.svg";
import { useNavigate } from "react-router-dom";

const CardOfAGame = ({ game }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  const logoPlatform = {
    PC: microsoft,
    "PlayStation 5": playstation,
    "PlayStation 4": playstation,
    PlayStation: playstation,
    "Xbox One": xbox,
    "Xbox Series S/X": xbox,
    Xbox: xbox,
    "Nintendo Switch": nintendo,
    Linux: linux,
  };

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
    <div>
      {isLoading === true ? (
        ""
      ) : (
        <div
          className="game-card"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={(event) => {
            event.preventDefault();
            navigate(`/game/${game.id}`);
          }}
        >
          <img src={game.background_image} alt="" />
          <div className="game-infos">
            <div className="platform">
              {game.platforms.map((platform) => {
                return (
                  <img
                    src={logoPlatform[platform.platform.name]}
                    alt={platform.platform.name}
                  />
                );
              })}
            </div>
            <div>
              {game.metacritic ? (
                <p className="metascore">{game.metacritic}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <h3>{game.name}</h3>
          {isShown && (
            <div className="card-opened">
              <div>
                <p style={{ color: "#797979", fontSize: "14px" }}>
                  Released date :
                </p>
                <p style={{ color: "white", fontSize: "14px" }}>
                  {game.released}
                </p>
              </div>
              <div className="genres">
                <p style={{ color: "#797979", fontSize: "14px" }}>Genres :</p>
                <div>
                  {game.genres.map((genre, index) => {
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
      )}
    </div>
  );
};

export default CardOfAGame;
