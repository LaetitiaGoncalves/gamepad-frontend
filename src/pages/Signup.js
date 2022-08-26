import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import upload from "../img/upload.svg";

const Signup = ({ setUser }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState({});
  const [preview, setPreview] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    try {
      if (password !== confirmPassword) {
        console.log("if");
      } else {
        if (email && username && password && avatar) {
          const response = await axios.post(
            "http://localhost:3000/signup",
            formData,
            {
              headers: {
                "Content-type": "multipart/form-data",
              },
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
              {avatar ? (
                <>
                  <label>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        setAvatar(event.target.files[0]);
                        setPreview(URL.createObjectURL(event.target.files[0]));
                      }}
                    />
                    Choose your Avatar
                    <img src={upload} alt="upload icon" />
                  </label>

                  <img src={preview} alt="" style={{ width: "50px" }} />
                </>
              ) : (
                <p>No file selected</p>
              )}
            </div>
            <div className="connexion">
              <label style={{ cursor: "pointer" }}>
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
