import { Container } from "react-bootstrap";
import "./style.css";
import React from "react";

function Hero() {
  return (
    <header style={{ paddingLeft: 0 ,letterSpacing:5}}>
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: "url('./src/assets/images/hero.png')",
          height: 500,
          backgroundSize: "contain",
        }}
      >
        <div style={{ height: 100 }}></div>
        <Container
          fluid
          className="d-flex flex-column justify-content-center align-items-center text-white"
        >
          <h1>Transform Your Scrap into Cash!</h1>
          <h4 className="mb-5">
            Join our marketplace for seamless buying and selling of scrap materials.
          </h4>
          
          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              color: "#A9A9A9",
              width: 500,
              padding: "0.5rem 1rem",
              borderRadius: 25,
              backgroundColor: "white",
            }}
          >
            <input
              type="text"
              placeholder="Search for scrap materials..."
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                color: "#A9A9A9",
                backgroundColor: "transparent",
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
              color="black"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default Hero;
