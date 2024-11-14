import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import React from "react";
import { Col } from "react-bootstrap";

import { FaArrowRight } from "react-icons/fa";

import AuctionCard from "@/components/AuctionCard/AuctionCard";
import { LinkContainer } from "react-router-bootstrap";

function LatestAuctions() {
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
          <div className="row  g-3 justify-content-center">
            <Col xs={12} sm={6} lg={4}>
              <AuctionCard />
            </Col>
            <Col xs={12} sm={6} lg={4}>
              <AuctionCard />
            </Col>
            <Col xs={12} sm={6} lg={4}>
              <AuctionCard />
            </Col>
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
