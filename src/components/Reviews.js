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
        console.log(response.data);
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
        ""
      ) : (
        <div>
          {!data.length ? (
            <p style={{ marginBottom: 40 }}>No reviews yet</p>
          ) : (
            <div>
              {data.map((review, index) => {
                return (
                  <div key={index} className="relevant-reviews">
                    <p className="reviews-title">{review.title}</p>
                    <p className="reviews-description">{review.description}</p>
                    <p className="reviews-username">
                      <span>Written by </span>
                      {review.user.username}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Reviews;
