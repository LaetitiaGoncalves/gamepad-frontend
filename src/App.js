import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faBookmark,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Header from "./components/Header";

function App() {
  library.add(faUser, faBookmark, faCommentDots);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
