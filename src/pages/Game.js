import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Game = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get(`http://localhost:3000/game/${id}`);
        setData(response.data);
        console.log(response.data);
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
        <div>
          {/* {data.map((infos) => {
            return (
              <div>
                <h1>{infos.name}</h1>
              </div>
            );
          })} */}
          <p>{data.name}</p>
        </div>
      )}
    </div>
  );
};

export default Game;
