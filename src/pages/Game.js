import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
            <img src={data.background_image} alt="" />
            <div>
              <div className="buttons-game">
                <button>Save to Collection</button>
                <button>Add a Review</button>
              </div>
              <div className="infos-game">
                <div className="left-infos">
                  <p>Platforms</p>
                  {data.platforms.map((platform) => {
                    return (
                      <div>
                        <p>{platform.platform.name}</p>
                      </div>
                    );
                  })}
                  <p>Released date</p>
                  <p>{data.released}</p>
                  <p>Publisher</p>
                  {data.publishers.map((publisher) => {
                    return <p>{publisher.name}</p>;
                  })}
                </div>
                <div className="rigth-infos">
                  <p>Genres</p>
                  {data.genres.map((genre) => {
                    return (
                      <div>
                        <p>{genre.name}</p>
                      </div>
                    );
                  })}
                  <p>Developer</p>
                  {data.developers.map((developer) => {
                    return <p>{developer.name}</p>;
                  })}
                  <p>Age Rating</p>
                  <p>{data.esrb_rating.name}</p>
                </div>
              </div>
              <div className="about-game">
                <p>About</p>
                <p>{data.description_raw}</p>
              </div>
            </div>
          </div>
          <div>
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
