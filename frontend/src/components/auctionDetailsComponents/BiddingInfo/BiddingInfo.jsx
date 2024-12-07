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
  const [isDepositAuthorized, setIsDepositAuthorized] = useState(false);
  const [highestBid, setHighestBid] = useState(
    currentItem.currentBid || currentItem.startingBid
  );
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const [paymentPurpose, setPaymentPurpose] = useState("deposit");
  const userId = localStorage.getItem("userId");
  const depositAmount = 50; // amount to hold for bidding authorization

  const winnerId =
    currentItem.auctionStatus == "Ended" &&
    currentItem.biddings &&
    currentItem.biddings.length > 0 &&
    currentItem.biddings.reduce(
      (highest, bid) => (bid.bidAmount > highest.bidAmount ? bid : highest),
      { bidAmount: 0 }
    ).bidderId;

  const isWinner =
    userId === winnerId && highestBid >= currentItem.reservePrice;

  const handleBidNowClick = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (!isDepositAuthorized) {
      setPaymentPurpose("deposit");
      setShowPaymentModal(true);
      return;
    }

    const numericBid = parseInt(bidAmount, 10);
    if (isNaN(numericBid)) {
      setError("Invalid number.");
    } else if (numericBid <= highestBid) {
      setError(`Bid amount must be at least ${highestBid + 1} JD.`);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5192/api/biddinghistory",
          {
            auctionId: currentItem.auctionId,
            bidderId: userId,
            bidAmount: numericBid,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setHighestBid(numericBid);
        setBidAmount("");
        setError("");
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
    }
  };

  const handlePurchaseClick = () => {
    setPaymentPurpose("purchase");
    setShowPaymentModal(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowPaymentModal(true); // Show payment modal after login
  };

  const handlePaymentSuccess = () => {
    if (paymentPurpose === "deposit") {
      setIsDepositAuthorized(true);
      setShowPaymentModal(false);
      Swal.fire({
        title: "Deposit Authorized",
        text: `A hold of ${depositAmount} JD has been placed on your account.`,
        icon: "success",
      });
    } else if (paymentPurpose === "purchase") {
      setShowPaymentModal(false);
      Swal.fire({
        title: "Purchase Complete",
        text: `Congratulations! You have successfully purchased the item for ${highestBid} JD.`,
        icon: "success",
      });
    }
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
              {currentItem.auctionStatus !== "Ended" && (
                <WatchButton auctionId={currentItem.auctionId} />
              )}
            </Col>
          </Row>
        </Card.Title>

        <Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            {currentItem.auctionStatus === "Ended" ? "Ended At" : "Ends After"}
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

        {currentItem.auctionStatus !== "Ended" && (
          <Card.Text className="d-flex justify-content-center">
            <Col xs={12} md={7}>
              {isLoggedIn && (
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder={`Bid Amount (min ${highestBid + 1})`}
                    min={highestBid + 1}
                    value={bidAmount}
                    step={1}
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

        {currentItem.auctionStatus === "Ended" && isWinner && (
          <Button
            onClick={handlePurchaseClick}
            className="text-white w-100 rounded-5 mt-2"
            variant="success"
          >
            Purchase for {highestBid} JD
          </Button>
        )}
      </Card.Body>

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <PaymentModal
        show={showPaymentModal}
        handleClose={() => setShowPaymentModal(false)}
        amount={paymentPurpose === "deposit" ? depositAmount : highestBid}
        userId={userId}
        auctionId={currentItem.auctionId}
        purpose={paymentPurpose}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Card>
  );
}
