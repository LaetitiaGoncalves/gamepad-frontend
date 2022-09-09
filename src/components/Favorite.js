import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

const Favorite = ({ data, token }) => {
  const [favorite, setFavorite] = useState();

  const handlefav = async (data) => {
    try {
      const body = {
        id: data.id,
        name: data.name,
        image: data.background_image,
      };

      const response = await axios.post(
        "http://localhost:3000/games/favorite",
        body,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.token) {
        setFavorite(response.data);
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
      <p>
        Save to <span style={{ color: "#6CC848" }}>Collection</span>
      </p>
      {favorite ? (
        <FontAwesomeIcon
          icon="fa-regular fa-bookmark"
          style={{ fontSize: "18px" }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Favorite;
