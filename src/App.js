import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faBookmark,
  faCommentDots,
  faCircleLeft,
  faCircleRight,
} from "@fortawesome/free-regular-svg-icons";

// Pages

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Collection from "./pages/Collection";
import Review from "./pages/Review";

// Components

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token !== null) {
      Cookies.set("userToken", token, { expires: 7 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };
  library.add(faUser, faBookmark, faCommentDots, faCircleLeft, faCircleRight);
  return (
    <div>
      <Router>
        <Header token={token} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home token={token} setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/collection" element={<Collection token={token} />} />
          <Route
            path="/game/:id"
            element={<Game token={token} setUser={setUser} />}
          />
          <Route
            path="/game/review/publish/:id"
            element={<Review token={token} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
