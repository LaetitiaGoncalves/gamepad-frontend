import { useState, useParams } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Review = ({ data, token, setUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        `http://localhost:3000/game/${id}/review/publish`,
        {
          title: data.title,
          description: data.description,
          user: data.user.username,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!token) {
        navigate("/login");
      } else {
        setUser(response.data.user.username);
      }

      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Review title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="textarea"
          name="Review text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Review;
