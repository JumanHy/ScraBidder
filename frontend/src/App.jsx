import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AuctionDetailsPage from "./pages/AuctionDetailsPage/AuctionDetailsPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/main.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
  return (
    <>
      <Router>
        <NavBar />{" "}
        <Container fluid className="mt-3">
          <Routes>
            <Route path="/auction" element={<AuctionDetailsPage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
