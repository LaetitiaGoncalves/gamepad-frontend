import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Favorite = ({ data, token }) => {
  const [favorite, setFavorite] = useState();

  const navigate = useNavigate();
  const bookmark = (
    <FontAwesomeIcon
      icon="fa-regular fa-bookmark"
      style={{ fontSize: "18px", color: "#6CC848" }}
    />
  );

  const handlefav = async (data) => {
    try {
      if (token) {
        const body = {
          id: data.id,
          name: data.name,
          image: data.background_image,
        };

        Cookies.set("bookmark", bookmark, { expires: 100 });

        const response = await axios.post(
          "http://localhost:3000/games/favorite",
          body,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setFavorite(response.data);

        console.log(favorite, setFavorite);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div
      onClick={() => {
        handlefav(data);
      }}
    >
      {favorite ? (
        <p>
          Save to <span style={{ color: "#6CC848" }}>Collection</span>
        </p>
      ) : (
        <p>
          Save to <span style={{ color: "#6CC848" }}>Collection</span>
        </p>
      )}
    </div>
  );
};

export default Favorite;
