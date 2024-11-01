import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Stack,
  Form,
} from "react-bootstrap";

import BidHistoryModal from "./BiddingHistoryModal";
import Timer from "./Timer";
import LoginModal from "./LoginModal";
import Swal from "sweetalert2";
import WatchButton from "./WatchButton";

export default function BiddingInfo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const startingPrice = 500;
  const [highestBid, setHighestBid] = useState(startingPrice);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");

  const handleBidNowClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const numericBid = parseInt(bidAmount, 10);
    if (isNaN(numericBid)) {
      setError("Invalid number.");
    } else if (numericBid <= highestBid) {
      setError(`Bid amount must be at least ${highestBid + 1} JD.`);
    } else {
      setHighestBid(numericBid);
      setBidAmount("");
      setError("");
      Swal.fire({
        icon: "success",
        title: "Bid Placed!",
        text: `Your bid of ${numericBid} JD has been placed.`,
      });
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      Swal.fire({
        title: "Hooray!",
        text: "You're now logged in. Let's get started!",
        icon: "success",
      });
    }
  }, [isLoggedIn]);

  return (
    <Card className="h-100 p-2 shadow border-0" style={{ maxHeight: "400px" }}>
      <Card.Body className="d-flex flex-column text-primary justify-content-center gap-2">
        <Card.Title>
          <Row fluid className="p-0 align-items-center justify-content-between">
            <Col xs="auto" className="text-success">
              Started
            </Col>
            <Col xs="auto">
              <WatchButton />
            </Col>
          </Row>
        </Card.Title>

        <Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Ends After</Card.Subtitle>
          <Timer />
        </Card.Text>

        <Card.Text>
          <Container fluid>
            <Row>
              <Stack className="p-0">
                <p className="m-0">
                  {highestBid == startingPrice
                    ? "Starting price "
                    : "Highest Bid "}
                  . <BidHistoryModal />
                </p>
                <h4>{highestBid} JD</h4>
              </Stack>
            </Row>
          </Container>
        </Card.Text>

        <Card.Text className="d-flex justify-content-center">
          <Col xs={12} md={7}>
            {isLoggedIn && (
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder={`Bid Amount (min ${highestBid + 1})`}
                  min={highestBid} // Set the minimum value for the input
                  value={bidAmount}
                  step={1} // Allow steps of 1 (whole numbers only)
                  onChange={(e) => {
                    // Remove decimal places
                    const inputValue = e.target.value;
                    // Only set the bidAmount if it is a whole number
                    if (/^\d*$/.test(inputValue)) {
                      setBidAmount(inputValue);
                      setError("");
                    }
                  }}
                  isInvalid={!!error}
                />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            <Button
              onClick={handleBidNowClick}
              className="text-white w-100 rounded-5 mt-2"
              variant="secondary"
            >
              Place Bid
            </Button>
          </Col>
        </Card.Text>
      </Card.Body>

      {/* Login Modal */}
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </Card>
  );
}
