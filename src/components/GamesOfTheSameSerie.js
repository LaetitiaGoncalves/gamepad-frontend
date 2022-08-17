import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GamesOfTheSameSerie = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get(
          `http://localhost:3000/samegames/${id}`
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
    <div>
      {isLoading === true ? (
        <p>Encours de chargement</p>
      ) : (
        <div>
          {data.results.map((games) => {
            return (
              <div>
                <img src={games.background_image} alt="" />
                <p key={games.id}>{games.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GamesOfTheSameSerie;
