import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Collection = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get("http://localhost:3000/collection");

        setData(response.data);
        setIsLoading(false);
      };
      fetchDatas();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="container collection">
      <h1>My favorites games</h1>
      {isLoading === true ? (
        <p>encours de chargement</p>
      ) : (
        <div className="collection-container">
          {data.map((collection, index) => {
            return (
              <div
                key={index}
                className="game-card"
                onClick={(event) => {
                  event.preventDefault();
                  navigate(`/game/${collection.id}`);
                }}
              >
                <img src={collection.image} alt="" />
                <h3>{collection.name}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Collection;
