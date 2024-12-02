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
import PaymentModal from "@/components/PaymentModal/PaymentModal";
import Swal from "sweetalert2";
import WatchButton from "./WatchButton";
import axios from "axios";

export default function BiddingInfo({ currentItem }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isDepositAuthorized, setIsDepositAuthorized] = useState(true);
  const startingPrice = currentItem.startingBid;
  const [highestBid, setHighestBid] = useState(currentItem.currentBid);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");

  const depositAmount = 50; // amount to hold for bidding authorization

  const handleBidNowClick = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (!isDepositAuthorized) {
      setShowPaymentModal(true);
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
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5125/api/biddinghistory",
        {
          auctionId: currentItem.auctionId,
          bidderId: 1,
          bidAmount: numericBid,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update the highest bid and reset input if the request is successful
      setHighestBid(numericBid);
      setBidAmount("");

      Swal.fire({
        icon: "success",
        title: "Bid Placed!",
        text: `Your bid of ${numericBid} JD has been placed successfully.`,
      });
    } catch (error) {
      console.error("Error placing bid:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Place Bid",
        text: "An error occurred while placing your bid. Please try again.",
      });
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowPaymentModal(true); // Show payment modal after login
  };

  const handlePaymentSuccess = () => {
    setIsDepositAuthorized(true); // Enable bidding after deposit authorization
    setShowPaymentModal(false);
    Swal.fire({
      title: "Deposit Authorized",
      text: `A hold of ${depositAmount} JD has been placed on your account.`,
      icon: "success",
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      Swal.fire({
        title: "Hooray!",
        text: "You're now logged in. Let's get started!",
        icon: "success",
      });
    }
    console.log(currentItem);
  }, [isLoggedIn]);

  return (
    <Card className="h-100 p-2 shadow border-0" style={{ maxHeight: "400px" }}>
      <Card.Body className="d-flex flex-column text-primary justify-content-center gap-2">
        <Card.Title>
          <Row fluid className="p-0 align-items-center justify-content-between">
            <Col xs="auto" className="text-success">
              {currentItem.auctionStatus}
            </Col>
            <Col xs="auto">
              {currentItem.auctionStatus != "Closed" && <WatchButton />}
            </Col>
          </Row>
        </Card.Title>

        <Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            {currentItem.auctionStatus == "Closed" ? "Ended At" : "Ends After"}
          </Card.Subtitle>
          <Timer auction={currentItem} />
        </Card.Text>

        <Card.Text>
          <Container fluid>
            <Row>
              <Stack className="p-0">
                <p className="m-0">
                  {currentItem.currentBid ? "Highest Bid  " : "Starting price "}
                  .{" "}
                  <BidHistoryModal
                    biddingsList={currentItem.biddings}
                    startingPrice={currentItem.startingBid}
                  />
                </p>
                {currentItem.currentBid && <h4>{currentItem.currentBid} JD</h4>}
                {!currentItem.currentBid && (
                  <h4>{currentItem.startingBid} JD</h4>
                )}
              </Stack>
            </Row>
          </Container>
        </Card.Text>

        {currentItem.auctionStatus != "Closed" && (
          <Card.Text className="d-flex justify-content-center">
            <Col xs={12} md={7}>
              {isLoggedIn && (
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder={`Bid Amount (min ${
                      currentItem.currentBid + 1
                    })`}
                    min={currentItem.currentBid + 1} // Set the minimum bid value
                    value={bidAmount}
                    step={1} // Whole numbers only
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (/^\d*$/.test(inputValue)) {
                        setBidAmount(inputValue);
                        setError("");
                      }
                    }}
                    isInvalid={!!error}
                    className={
                      !isLoggedIn || !isDepositAuthorized ? "d-none" : ""
                    }
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
        )}
      </Card.Body>

      {/* Login Modal */}
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Payment Modal */}
      <PaymentModal
        show={showPaymentModal}
        handleClose={() => setShowPaymentModal(false)}
        amount={depositAmount}
        userId={1}
        auctionId={12}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Card>
  );
}
