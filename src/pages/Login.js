import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
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
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        setErrorMessage("Email or password invalid");
      }
      console.log(error.message);
    }
  };
  return (
    <div className="container signupPage">
      <div className="contain-card">
        <div className="howItWorks">
          <h2>How it Works ?</h2>
          <div className="user">
            <FontAwesomeIcon icon="fa-regular fa-user" />
            <p>
              Log in to your free account to be able to get all features of
              Gamepad
            </p>
          </div>
          <div className="user">
            <FontAwesomeIcon icon="fa-regular fa-bookmark" />
            <p>Add a game to your collection</p>
          </div>
          <div className="user">
            <FontAwesomeIcon icon="fa-regular fa-comment-dots" />
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
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p style={{ fontSize: 12, color: "#FF4655" }}>{errorMessage}</p>
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
