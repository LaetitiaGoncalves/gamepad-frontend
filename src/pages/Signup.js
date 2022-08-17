import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import upload from "../img/upload.svg";

const Signup = () => {
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
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" name="" id="" placeholder="Password" />
            <input
              type="password"
              name=""
              id=""
              placeholder="Confirm Password"
            />
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
