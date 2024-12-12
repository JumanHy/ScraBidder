import { memo, useEffect, useState } from "react";
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

import PaymentModal from "@/components/PaymentModal/PaymentModal";
import Swal from "sweetalert2";
import WatchButton from "./WatchButton";
import axios from "axios";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
function BiddingInfo({ currentItem, status, setStatus }) {
  const isLoggedIn = localStorage.getItem("authToken");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isDepositAuthorized, setIsDepositAuthorized] = useState(
    localStorage.getItem(`${currentItem.auctionId}_deposit`) ||
      localStorage.getItem("role") == "Business"
  );
  const [highestBid, setHighestBid] = useState(currentItem.currentBid);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const [paymentPurpose, setPaymentPurpose] = useState("deposit");
  const [biddings, setBiddings] = useState(currentItem.biddings);
  const userId = localStorage.getItem("userId");
  const depositAmount = 50; // amount to hold for bidding authorization
  const navigate = useNavigate();
  const winnerId =
    status == "Ended" &&
    biddings &&
    biddings.length > 0 &&
    biddings.reduce(
      (highest, bid) => (bid.bidAmount > highest.bidAmount ? bid : highest),
      { bidAmount: 0 }
    ).bidderId;

  const isWinner = userId == winnerId && highestBid >= currentItem.reservePrice;

  // Handle Bid Placement
  const handleBidNowClick = async () => {
    if (!isLoggedIn) {
      navigate("/login"); // Navigate to login page if not logged in
      return null; // Prevent further rendering
    }

    if (!isDepositAuthorized) {
      setPaymentPurpose("deposit");
      setShowPaymentModal(true);
      return;
    }

    const numericBid = parseInt(bidAmount, 10);
    const permissableBid = highestBid ? highestBid : currentItem.startingBid;

    if (isNaN(numericBid)) {
      setError("Invalid number.");
    } else if (numericBid <= permissableBid) {
      setError(`Bid amount must be at least ${permissableBid + 1} JD.`);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5192/api/biddinghistory",
          {
            auctionId: currentItem.auctionId,
            bidderId: userId,
            bidAmount: numericBid,
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

  const handlePaymentSuccess = () => {
    if (paymentPurpose == "deposit") {
      localStorage.setItem(`${currentItem.auctionId}_deposit`, true);
      setIsDepositAuthorized(true);
      setShowPaymentModal(false);
      Swal.fire({
        title: "Deposit Authorized",
        text: `A hold of ${depositAmount} JD has been placed on your account.`,
        icon: "success",
      });
    } else if (paymentPurpose == "purchase") {
      setShowPaymentModal(false);
      Swal.fire({
        title: "Purchase Complete",
        text: `Congratulations! You have successfully purchased the item for ${highestBid} JD.`,
        icon: "success",
      });
    }
  };

  useEffect(() => {
    // Initialize the SignalR connection
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5192/biddingHub", {
        accessTokenFactory: () => localStorage.getItem("authToken"),
      }) // Adjust the URL as needed
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        // Listen for updates from the hub
        newConnection.on(
          "ReceiveBidUpdate",
          (auctionId, currentBid, biddings) => {
            if (auctionId == currentItem.auctionId) {
              setHighestBid(currentBid);
              setBiddings(biddings);
            }
          }
        );
      })
      .catch((error) => console.error("SignalR Connection Error: ", error));

    // Cleanup on component unmount
    return () => {
      newConnection.stop();
    };
  }, []);

  return (
    <Card className="h-100 p-2 shadow border-0" style={{ maxHeight: "400px" }}>
      <Card.Body className="d-flex flex-column text-primary justify-content-center gap-2">
        <Card.Title>
          <Row fluid className="p-0 align-items-center justify-content-between">
            <Col xs="auto" className="text-success">
              {status}
            </Col>
            <Col xs="auto">
              {status !== "Ended" && (
                <WatchButton auctionId={currentItem.auctionId} />
              )}
            </Col>
          </Row>
        </Card.Title>

        <Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            {status == "Approved" && "Starts After"}
            {status == "Started" && "Ends After"}
            {status == "Ended" && "Ended At"}
          </Card.Subtitle>
          {status != "Ended" && (
            <Timer
              auction={currentItem}
              status={status}
              setStatus={setStatus}
            />
          )}
          {status == "Ended" && (
            <div className="text-danger text-center">
              {formatDate(currentItem.endingTime)}
            </div>
          )}
        </Card.Text>

        <Card.Text>
          <Container fluid>
            <Row>
              <Stack className="p-0">
                <p className="m-0">
                  {highestBid ? "Highest Bid  " : "Starting price "}
                  <BidHistoryModal
                    biddingsList={biddings}
                    startingPrice={currentItem.startingBid}
                  />
                </p>
                {highestBid ? (
                  <h4>{highestBid} JD</h4>
                ) : (
                  <h4>{currentItem.startingBid} JD</h4>
                )}
              </Stack>
            </Row>
          </Container>
        </Card.Text>

        {status == "Started" &&
          !isWinner &&
          userId != currentItem.seller.sellerId && (
            <Card.Text className="d-flex justify-content-center">
              <Col xs={12} md={7}>
                {isLoggedIn && (
                  <Form.Group>
                    <Form.Control
                      type="number"
                      placeholder={`Bid Amount (min ${
                        highestBid != null
                          ? highestBid + 1
                          : currentItem.startingBid + 1
                      })`}
                      min={
                        highestBid
                          ? highestBid + 1
                          : currentItem.startingBid + 1
                      } // Set the minimum bid value
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

        {/* If the auction has ended and the user is the winner */}
        {status == "Ended" && isWinner && (
          <Card.Text className="d-flex justify-content-center">
            <Col xs={12} md={7}>
              <Button
                onClick={handlePurchaseClick}
                className="text-white w-100 rounded-5 mt-2"
                variant="success"
              >
                Purchase for {highestBid} JD
              </Button>
            </Col>
          </Card.Text>
        )}
      </Card.Body>

      <PaymentModal
        show={showPaymentModal}
        handleClose={() => setShowPaymentModal(false)}
        amount={paymentPurpose == "deposit" ? depositAmount : highestBid}
        userId={userId}
        auctionId={currentItem.auctionId}
        purpose={paymentPurpose}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Card>
  );
}
export default memo(BiddingInfo);
