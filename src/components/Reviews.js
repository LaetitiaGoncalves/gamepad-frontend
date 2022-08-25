import { useState, useEffect } from "react";
import axios from "axios";

const Reviews = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get("http://localhost:3000/review");
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
        <p>En cours de chargement</p>
      ) : (
        <div>
          {data.map((review, index) => {
            return (
              <div key={index}>
                <p>{review.title}</p>
                <p>{review.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Reviews;
