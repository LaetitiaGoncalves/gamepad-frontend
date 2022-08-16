import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
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
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" name="" id="" placeholder="Password" />
            <div className="connexion">
              <label>
                <input type="submit" style={{ display: "none" }} />
                Connexion
              </label>
            </div>
            <button>Don’t have an account yet ?</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
