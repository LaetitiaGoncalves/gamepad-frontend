import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import microsoft from "../img/microsoft1.svg";
import playstation from "../img/playstation-logotype.svg";
import xbox from "../img/xbox-logo.svg";
import nintendo from "../img/nintendo-switch.svg";
import linux from "../img/linux-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// component

import GamesOfTheSameSerie from "../components/GamesOfTheSameSerie";

const Game = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get(`http://localhost:3000/game/${id}`);
        setData(response.data);
        setIsLoading(false);
      };
      fetchDatas();
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  return (
    <div className="container">
      {isLoading === true ? (
        <p>En cours de chargement</p>
      ) : (
        <div className="container game-page">
          <h1>{data.name}</h1>
          <div className="about-game">
            <div>
              <img src={data.background_image} alt="" />
            </div>

            <div className="right-part-game">
              <div className="buttons-game">
                <div>
                  <p>
                    Save to <span style={{ color: "#6CC848" }}>Collection</span>{" "}
                  </p>
                  <FontAwesomeIcon
                    icon="fa-regular fa-bookmark"
                    style={{ fontSize: "18px" }}
                  />
                </div>
                <div>
                  <p> Add a Review</p>
                  <FontAwesomeIcon
                    icon="fa-regular fa-comment-dots"
                    style={{ fontSize: "18px" }}
                  />
                </div>
              </div>
              <div className="infos-game">
                <div className="left-infos">
                  <p className="gameInfo-title">Platforms</p>
                  <div className="platform">
                    {data.platforms.map((platform) => {
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
                      return console.log(platform.name);
                    })}
                  </div>

                  <p className="gameInfo-title">Released date</p>
                  <p>{data.released}</p>
                  <p className="gameInfo-title">Publisher</p>
                  {data.publishers.map((publisher) => {
                    return <p key={publisher.id}>{publisher.name}</p>;
                  })}
                </div>
                <div className="rigth-infos">
                  <p className="gameInfo-title">Genres</p>
                  {data.genres.map((genre) => {
                    return (
                      <div>
                        <p key={genre.id} className="gameInfo">
                          {genre.name}
                        </p>
                      </div>
                    );
                  })}
                  <p className="gameInfo-title">Developer</p>
                  {data.developers.map((developer) => {
                    return <p key={developer.id}>{developer.name}</p>;
                  })}
                  <p className="gameInfo-title">Age Rating</p>
                  <p>{data.esrb_rating.name}</p>
                </div>
              </div>
              <div className="description-game">
                <p className="gameInfo-title">About</p>
                <p>
                  {data.description_raw.length > 200
                    ? `${data.description_raw.substring(0, 200)}...`
                    : data.description_raw}
                </p>
              </div>
            </div>
          </div>
          <div className="same-games">
            <h2>Games like {data.name}</h2>
            <div>
              <GamesOfTheSameSerie />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
