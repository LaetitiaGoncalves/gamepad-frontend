import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import upload from "../img/upload.svg";

const Signup = ({ setUser }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   const [errorPassword, setErrorPassword] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        console.log("if");
      } else {
        if (email && username && password) {
          const response = await axios.post(
            "https://laetitia-gamepad-backend.herokuapp.com/signup",
            {
              email: email,
              username: username,
              password: password,
            }
          );
          if (response.data) {
            setUser(response.data.token);
            navigate("/");
          }
        } else {
          setErrorMessage("Please fill in all fields");
        }
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte ! ");
      }
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
        <div className="signup-card">
          <h1>Sign Up</h1>
          {/* {errorPassword ? (
            ""
          ) : ( */}
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {/* ternaire dans la balise p */}
            {password === confirmPassword ? (
              ""
            ) : (
              <p
                style={{
                  fontSize: "12px",
                  color: "#FF4655",
                  padding: "5px 0px 10px 0px",
                }}
              >
                Passwords did not match
              </p>
            )}
            <div className="addPhoto">
              <label>
                <input type="file" style={{ display: "none" }} />
                Add a Photo
                <img src={upload} alt="upload icon" />
              </label>
              <p>No file selected</p>
            </div>
            <div className="connexion">
              <label>
                <input type="submit" style={{ display: "none" }} />
                S'inscrire
              </label>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#FF4655",
                padding: "5px 0px 10px 0px",
              }}
            >
              {errorMessage}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
