import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import React from "react";
import { Image, Col } from "react-bootstrap";

import logo1 from "/src/assets/images/logo1.png";
import logo2 from "/src/assets/images/logo2.png";

import { FaArrowRight } from "react-icons/fa";

import AuctionCard from "@/components/AuctionCard/AuctionCard";

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

        <div>
          <button
            className="bid-button mt-5 mb-3 border-0 rounded-5 pb-2 pt-2"
            style={{
              backgroundColor: "#B87333",
              color: "white",
              letterSpacing: 3,
              width: 250,
            }}
          >
            <a>Explore More </a>
            <FaArrowRight />
          </button>
        </div>
      </div>
      {/* our partners section*/}
      <div
        className="d-flex flex-column align-items-center pt-4 pb-4"
        style={{
          backgroundColor: "#E6E6E6",
          color: "#003A70",
          letterSpacing: 5,
        }}
      >
        <h2 className="pb-5">Our Partners</h2>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 col-md-3 col-sm-2 pb-5">
              <Image
                src={logo1}
                fluid
                alt="logo"
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                }}
              />
            </div>

            <div className="col-6 col-md-3 col-sm-2 pb-5">
              <Image
                src={logo2}
                fluid
                alt="logo"
                style={{
                  width: 150,
                  height: 150,
                  border: "1px solid",
                  borderRadius: 100,
                }}
              />
            </div>

            <div className="col-6 col-md-3 col-sm-2 pb-5">
              <Image
                src={logo1}
                fluid
                alt="logo"
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                }}
              />
            </div>

            <div className="col-6 col-md-3 col-sm-2 pb-5">
              <Image
                src={logo2}
                fluid
                alt="logo"
                style={{
                  width: 150,
                  height: 150,
                  border: "1px solid",
                  borderRadius: 100,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default LatestAuctions;
