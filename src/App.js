import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faBookmark,
  faCommentDots,
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

  const setUser = (tokenToCheck) => {
    if (tokenToCheck !== null) {
      Cookies.set("userToken", tokenToCheck, { expires: 7 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(tokenToCheck);
  };
  library.add(faUser, faBookmark, faCommentDots);
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
            element={<Game setUser={setUser} token={token} />}
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
