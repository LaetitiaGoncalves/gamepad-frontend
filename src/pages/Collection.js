import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Collection = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get(
          "https://laetitia-gamepad-backend.herokuapp.com/collection",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (token) {
          setData(response.data);
          setIsLoading(false);
        }
      };
      fetchDatas();
    } catch (error) {
      console.log(error.message);
    }
  }, [token]);

  return (
    <div className="container collection">
      <h1>My favorites games</h1>
      {isLoading === true ? (
        <p>encours de chargement</p>
      ) : (
        <div className="collection-container">
          {token ? (
            <>
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
            </>
          ) : (
            <p>No favorites yet !</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Collection;
