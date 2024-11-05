import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AuctionDetailsPage from "./pages/AuctionDetailsPage/AuctionDetailsPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import Home from "./Pages/HomePage/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/main.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auction" element={<AuctionDetailsPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
        <Footer />;
      </Router>
    </>
  );
}

export default App;
