import { Container, Row, Col } from "react-bootstrap";
import "./style.css";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
function Hero() {
  return (
    <header style={{ paddingLeft: 0, letterSpacing: 5 }}>
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: "url('./src/assets/images/hero.png')",
          height: "500px",
          backgroundSize: "cover", // Ensure the image covers the entire section
          backgroundPosition: "center", // Center the background image
        }}
      >
        <Container
          fluid
          className="d-flex flex-column justify-content-center align-items-center text-white h-100"
        >
          <Row className="justify-content-center">
            <Col xs={12}>
              <h1>Transform Your Scrap into Cash!</h1>
              <h4 className="mb-5">
                Join our marketplace for seamless buying and selling of scrap
                materials.
              </h4>
            </Col>
            <Col xs={12} className="d-flex justify-content-center">
              <SearchBar />
            </Col>
          </Row>
        </Container>
      </div>
    </header>
  );
}

export default Hero;
