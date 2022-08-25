import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

const Favorite = ({ data, token }) => {
  const [favorite, setFavorite] = useState();

  const navigate = useNavigate();

  const handlefav = async (data) => {
    try {
      //   const formData = new FormData();
      //   formData.append("name", data.name);
      //   formData.append("image", data.background_image);
      //   formData.append("id", data._id);

      //   for (let keyValues of formData.entries()) {
      //     console.log("key : ", keyValues[0], " |||||  value : ", keyValues[1]);
      //   }
      const body = {
        id: data.id,
        name: data.name,
        image: data.background_image,
      };
      console.log(body);
      const response = await axios.post(
        "http://localhost:3000/games/favorite",
        body,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!token) {
        navigate("/login");
      } else {
        setFavorite(response.data);
      }

      console.log(data);
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
      {favorite && (
        <FontAwesomeIcon
          icon="fa-regular fa-bookmark"
          style={{ fontSize: "18px" }}
        />
      )}
    </div>
  );
};

export default Favorite;
