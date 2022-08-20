import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const GamesOfTheSameSerie = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get(
          `https://laetitia-gamepad-backend.herokuapp.com/samegames/${id}`
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
        <p>Encours de chargement</p>
      ) : (
        <div className="similar-games">
          <div>
            {data.results.map((games, index) => {
              return (
                <div
                  key={index}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(`/game/${games.id}`);
                  }}
                >
                  <div>
                    <img src={games.background_image} alt="" />
                  </div>
                  <div className="background-similar-games">
                    <p>{games.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesOfTheSameSerie;
