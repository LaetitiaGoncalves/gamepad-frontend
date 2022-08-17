import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GamesOfTheSameSerie = () => {
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get(
          `http://localhost:3000/samegames/${id}`
        );
        setData(response.data);
      };
      fetchDatas();
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  return (
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
  );
};

export default GamesOfTheSameSerie;
