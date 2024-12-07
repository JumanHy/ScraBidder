import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { House, Person, Hammer, BarChart } from "react-bootstrap-icons";
import "./style.css";
import Overview from "../Overview/Overview";
import UsersData from "../UsersData/UsersData";
import AuctionsData from "../AuctionsData/AuctionData";
import Stats from "../Stats/Stats";
import axios from "axios";

function SideBar() {
  const [auctions, setAuctions] = useState([]);
  const [biddings, setBiddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Define multiple API requests
    const fetchAuctions = axios.get("http://localhost:5125/api/auction"); // Replace with your endpoint
    const fetchBiddings = axios.get("http://localhost:5125/api/biddinghistory"); // Replace with your endpoint

    console.log({ fetchAuctions }, { fetchBiddings });

    // Use Promise.all to wait for all requests to complete
    Promise.all([fetchAuctions, fetchBiddings])
      .then(([auctionsResponse, biddingsResponse]) => {
        // Update states with data from each API
        setAuctions(auctionsResponse.data); // Assuming auctionsResponse.data contains the auctions array
        setBiddings(biddingsResponse.data); // Assuming usersResponse.data contains the users array
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }, []);

  const soldAuctionsCount = auctions.filter(
    (auction) => auction.status && auction.status.toLowerCase() === "sold"
  ).length;

  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem("activeComponent") || "overview"
  );
  const handleComponentChange = (component) => {
    setActiveComponent(component);
    localStorage.setItem("activeComponent", component);
  };
  useEffect(() => {
    const savedComponent = localStorage.getItem("activeComponent");
    if (savedComponent) {
      setActiveComponent(savedComponent);
    }
  }, []);
  return (
    <Container fluid className=" p-0 m-0">
      <Row className="flex-nowrap main-content">
        <Col xs={2} sm={3} lg={2} xl={2} className="sidebar p-0 text-center">
          <a
            href="#"
            className={`sidebarlink text-decoration-none ${
              activeComponent === "overview" ? "active" : ""
            }`}
            onClick={() => handleComponentChange("overview")}
          >
            <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
              <House size={25} color="white" />
              <span className="ms-2 d-none d-sm-inline">Overview</span>
            </div>
          </a>
          <a
            href="#"
            className={`sidebarlink text-decoration-none ${
              activeComponent === "users" ? "active" : ""
            }`}
            onClick={() => handleComponentChange("users")}
          >
            <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
              <Person size={25} color="white" />
              <span className="ms-2 d-none d-sm-inline">Users</span>
            </div>
          </a>
          <a
            href="#"
            className={`sidebarlink text-decoration-none ${
              activeComponent === "auctions" ? "active" : ""
            }`}
            onClick={() => handleComponentChange("auctions")}
          >
            <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
              <Hammer size={25} color="white" />
              <span className="ms-2 d-none d-sm-inline">Auctions</span>
            </div>
          </a>
          <a
            href="#"
            className={`sidebarlink text-decoration-none ${
              activeComponent === "stats" ? "active" : ""
            }`}
            onClick={() => handleComponentChange("stats")}
          >
            <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
              <BarChart size={25} color="white" />
              <span className="ms-2 d-none d-sm-inline">Statistics</span>
            </div>
          </a>
        </Col>

        <Col
          xs={10}
          sm={9}
          lg={10}
          xl={10}
          style={{ backgroundColor: "#F5F5F5" }}
          className="dashboard-component"
        >
          {loading && (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {activeComponent === "overview" && !loading && <Overview />}
          {activeComponent === "users" && !loading && <UsersData />}
          {activeComponent === "auctions" && !loading && (
            <AuctionsData auctions={auctions} BiddingHistory={biddings} />
          )}
          {activeComponent === "stats" && !loading && (
            <Stats
              auctionsCount={auctions.length}
              soldAuctions={soldAuctionsCount}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SideBar;
