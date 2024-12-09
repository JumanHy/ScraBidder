import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Spinner } from "react-bootstrap";

import { FaArrowRight } from "react-icons/fa";

import AuctionCard from "@/components/AuctionCard/AuctionCard";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

function LatestAuctions() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:5192/api/auction")
      .then((response) => {
        setAuctions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching auctions:", err);
        setError(true);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <>
      <div
        className="d-flex flex-column align-items-center pt-4 pb-4"
        style={{
          backgroundColor: "#F0F8FF",
          color: "#333333",
          letterSpacing: 1,
        }}
      >
        <h2 className="pb-5" style={{ letterSpacing: 5 }}>
          Latest Auctions
        </h2>

        <div className="container">
          <div className="row g-3 justify-content-center">
            {/* Display only the first 3 auctions */}
            {auctions.length > 0 ? (
              auctions.slice(0, 3).map((auction, index) => (
                <Col key={index} xs={12} sm={6} lg={4}>
                  <AuctionCard currentAuction={auction} />
                </Col>
              ))
            ) : (
              <Container className="pt-5">
                <Alert variant="primary">
                  There are currently no items to display.
                </Alert>
              </Container>
            )}
          </div>
        </div>
        <LinkContainer to={"results"}>
          <div>
            <button
              className="bid-button text-white bg-secondary mt-5 mb-3 border-0 rounded-5 pb-2 pt-2"
              style={{
                letterSpacing: 3,
                width: 250,
              }}
            >
              Explore More
              <FaArrowRight />
            </button>
          </div>
        </LinkContainer>
      </div>
    </>
  );
}
export default LatestAuctions;
