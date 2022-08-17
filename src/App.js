import "./App.css";
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

// Components

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  library.add(faUser, faBookmark, faCommentDots);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
