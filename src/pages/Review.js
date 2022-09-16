import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const Review = ({ data, token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        `http://localhost:3000/game/review/publish/${id}`,
        {
          title: title,
          description: description,
          gameId: id,
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
        setTitle(response.data.title);
        setDescription(response.data.description);
        navigate(`/game/${id}`);

        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container review-container">
      <h1>Add a Review !</h1>
      <form onSubmit={handleSubmit}>
        <h2>Title</h2>
        <input
          type="text"
          name="Review title"
          placeholder="The best game of 2022..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2>Description</h2>
        <textarea
          maxLength={500}
          name="Review text"
          placeholder="I appreciate the gameplay and the the visual style. I hope that developpers will unlock multiplayer soon..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Review;
