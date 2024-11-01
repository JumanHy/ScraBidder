import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AuctionDetailsPage from "./pages/AuctionDetailsPage/AuctionDetailsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/main.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
  return (
    <>
      <NavBar />
      <Container fluid className="mt-3">
        <Router>
          <Routes>
            <Route path="/auction" element={<AuctionDetailsPage />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
