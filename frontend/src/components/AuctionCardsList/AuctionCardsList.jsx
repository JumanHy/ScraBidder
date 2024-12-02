import { Col, Row, Alert } from "react-bootstrap";
import AuctionCard from "@/components/AuctionCard/AuctionCard";
import axios from "axios";
import { useEffect, useState } from "react";


function AuctionCardsList({ currentItems }) {

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    // Define multiple API requests
    const fetchAuctions = axios.get('http://localhost:5125/api/auction'); // Replace with your endpoint

    // Use Promise.all to wait for all requests to complete
    Promise.all([fetchAuctions])
      .then(([auctionsResponse]) => {
        // Update states with data from each API
        setAuctions(auctionsResponse.data); // Assuming auctionsResponse.data contains the auctions array
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }, []);
  return (
    <Row className="g-3">
      {auctions.length > 0 ? (
        auctions.map((currentAuction, index) => (
          <Col key={index} xs={12} sm={6} lg={4}>
            <AuctionCard currentAuction={currentAuction} />
          </Col>
        ))
      ) : (
        <Col
          xs={12}
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <Alert variant="primary" className="text-center">
            <Alert.Heading>No Content Available</Alert.Heading>
            <p>
              There are currently no items to display. Please check back later
              or adjust your filters.
            </p>
          </Alert>
        </Col>
      )}
    </Row>
  );
}

export default AuctionCardsList;
