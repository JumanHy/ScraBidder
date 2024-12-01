import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

function PaymentModal({
  show,
  handleClose,
  amount,
  userId,
  auctionId,
  onPaymentSuccess,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const purpose = "Deposit";
  // API endpoint for deposit
  const apiUrl = "http://localhost:5125/api/payments"; // Replace with your API endpoint

  const handleApprove = async (data) => {
    console.log(data.orderID);
    try {
      // Call backend API to authorize payment
      const response = await axios.post(`${apiUrl}/authorize`, {
        orderId: data.orderID,
        userId,
        auctionId,
        purpose,
      });

      console.log(response);
      onPaymentSuccess(); // Notify parent of success
      handleClose(); // Close modal
    } catch (error) {
      setErrorMessage("Payment authorization failed. Please try again.");
      console.error(
        "Authorization Error:",
        error.response?.data || error.message
      );
    }
  };

  const createOrder = async () => {
    try {
      const response = await axios.post(`${apiUrl}/order`, {
        UserId: userId,
        AuctionId: auctionId,
        Amount: amount,
        Purpose: purpose,
        Intent: "authorize",
      });

      if (response.data && response.data.orderId) {
        console.log(response.data.orderId);
        return response.data.orderId; // Return orderId to PayPal
      } else {
        throw new Error("Failed to create deposit.");
      }
    } catch (error) {
      setErrorMessage("Unable to create deposit. Please try again.");
      console.error("Create Order Error:", error);
      throw error; // Reject PayPal Buttons on error
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bidding Deposit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="primary">
          Please note: A deposit of {amount} JD will be authorized and held by
          your bank. No money will be taken from your account at this moment.
          The deposit will be refunded.
        </Alert>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        {/* PayPal Button Integration */}
        <PayPalScriptProvider
          options={{
            "client-id":
              "AVsMRGX8JBTYr7oZyq4rcrRTsUu6X1ODkYfqSyvCMmL6kHVTLknTMiV5eJrmxpe7aXdBLm1r_1UMasHG",
            locale: "en_JO",
            components: "buttons,funding-eligibility",
            intent: "authorize", // Use 'authorize' to only authorize the payment
          }}
        >
          <PayPalButtons
            createOrder={createOrder} // Call backend API to create the order
            onApprove={handleApprove} // Backend already handles approval
            onError={(error) => {
              setErrorMessage(
                "An error occurred with PayPal. Please try again."
              );
              console.error("PayPal Error:", error);
            }} // Handle PayPal error
          />
        </PayPalScriptProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="text-white"
          onClick={handleClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PaymentModal;
