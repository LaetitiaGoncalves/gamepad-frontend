import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://laetitia-gamepad-backend.herokuapp.com/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container signupPage">
      <div className="contain-card">
        <div className="howItWorks">
          <h2>How it Works ?</h2>
          <div className="user">
            <FontAwesomeIcon
              icon="fa-regular fa-user"
              style={{ fontSize: "25px" }}
            />
            <p>
              Log in to your free account to be able to get all features of
              Gamepad
            </p>
          </div>
          <div className="user">
            <FontAwesomeIcon
              icon="fa-regular fa-bookmark"
              style={{ fontSize: "25px" }}
            />
            <p>Add a game to your collection</p>
          </div>
          <div className="user">
            <FontAwesomeIcon
              icon="fa-regular fa-comment-dots"
              style={{ fontSize: "25px" }}
            />
            <p>Leave a review for a game</p>
          </div>
        </div>
        <div className="signup-card login-card">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="connexion">
              <label>
                <input type="submit" style={{ display: "none" }} />
                Connexion
              </label>
            </div>
            <Link to="/signup">
              <button>Don’t have an account yet ?</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
