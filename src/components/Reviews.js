import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Reviews = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchDatas = async () => {
        const response = await axios.get(`http://localhost:3000/review/${id}`);

        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      };
      fetchDatas();
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  return (
    <div>
      {isLoading === true ? (
        <p>En cours de chargement</p>
      ) : (
        <div>
          {data.map((review, index) => {
            return (
              <div key={index}>
                <div>
                  <p>{review.title}</p>
                  <p>{review.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Reviews;
