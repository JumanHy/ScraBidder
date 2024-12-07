import { Col, Row, Alert } from "react-bootstrap";
import AuctionCard from "@/components/AuctionCard/AuctionCard";

function AuctionCardsList({ currentItems }) {
  return (
    <Row className="g-3">
      {currentItems && currentItems.length > 0 ? (
        currentItems.map((currentAuction, index) => (
          <Col key={currentAuction.auctionId || index} xs={12} sm={6} lg={4}>
            {currentAuction.auctionStatus != "Denied" &&
              currentAuction.auctionStatus != "Pending" &&
              currentAuction.auctionStatus != "Deleted" && (
                <AuctionCard currentAuction={currentAuction} />
              )}
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
