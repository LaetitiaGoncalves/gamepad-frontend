import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import microsoft from "../img/microsoft1.svg";
import playstation from "../img/playstation-logotype.svg";
import xbox from "../img/xbox-logo.svg";
import nintendo from "../img/nintendo-switch.svg";
import linux from "../img/linux-logo.svg";
import android from "../img/android-logo.svg";
import apple from "../img/apple-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// component

import GamesOfTheSameSerie from "../components/GamesOfTheSameSerie";
import Reviews from "../components/Reviews";
import Favorite from "../components/Favorite";

const Game = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

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
    "Apple Macintosh": apple,
    iOS: apple,
    Android: android,
  };
  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get(
          `https://laetitia-gamepad-backend.herokuapp.com/game/${id}`
        );

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
                <Favorite data={data} token={token} />

                <Link to={{ pathname: `/game/${id}/review` }}>
                  <p> Add a Review</p>
                  <FontAwesomeIcon
                    icon="fa-regular fa-comment-dots"
                    style={{ fontSize: "18px" }}
                  />
                </Link>
              </div>
              <div className="infos-game">
                <div className="left-infos">
                  <p className="gameInfo-title">Platforms</p>
                  <div className="platform">
                    {data.parent_platforms.map((platform, index) => {
                      return (
                        <img
                          src={logoPlatform[platform.platform.name]}
                          alt={platform.platform.name}
                          key={index}
                        />
                      );
                    })}
                  </div>

                  <p className="gameInfo-title">Released date</p>
                  <p>{data.released}</p>
                  <p className="gameInfo-title">Publisher</p>
                  {data.publishers.map((publisher, index) => {
                    return <p key={index}>{publisher.name}</p>;
                  })}
                </div>
                <div className="rigth-infos">
                  <p className="gameInfo-title">Genres</p>
                  <div className="genres-game-info">
                    {data.genres.map((genre, index) => {
                      return (
                        <p key={index} className="gameInfo">
                          {genre.name}
                        </p>
                      );
                    })}
                  </div>

                  <p className="gameInfo-title">Developer</p>
                  {data.developers.map((developer, index) => {
                    return <p key={index}>{developer.name}</p>;
                  })}
                  <p className="gameInfo-title">Age Rating</p>
                  {data.esrb_rating ? <p>{data.esrb_rating.name}</p> : ""}
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
            <GamesOfTheSameSerie id={id} />
          </div>
          <div className="reviews">
            <h2>Most Relevant Reviews</h2>
            <Reviews />
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
