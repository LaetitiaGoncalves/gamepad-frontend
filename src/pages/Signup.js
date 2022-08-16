import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = () => {
  return (
    <div>
      <div className="howItWorks">
        <h2>How it Works ?</h2>
        <div>
          <FontAwesomeIcon icon="fa-regular fa-user" />
          <p>
            Log in to your free account to be able to get all features of
            Gamepad
          </p>
        </div>
        <div>
          <FontAwesomeIcon icon="fa-regular fa-bookmark" />
          <p>Add a game to your collection</p>
        </div>
        <div>
          <FontAwesomeIcon icon="fa-regular fa-comment-dots" />
          <p>Leave a review for a game</p>
        </div>
      </div>
      <div className="signup-card">
        <h1>Sign Up</h1>
        <form>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" name="" id="" placeholder="Password" />
          <input type="password" name="" id="" placeholder="Confirm Password" />
          <div>
            <label>
              <input type="file" style={{ display: "none" }} />
              Add a Photo
            </label>
            <p>No file selected</p>
          </div>
          <div>
            <label>
              <input type="submit" style={{ display: "none" }} />
              Envoyer
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
