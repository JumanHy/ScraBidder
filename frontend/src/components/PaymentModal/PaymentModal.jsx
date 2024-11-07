import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PaymentModal({ show, handleClose, amount, onPaymentSuccess }) {
  const [errorMessage, setErrorMessage] = useState("");
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount.toString(),
            },
            shipping: {
              address: {
                country_code: "JO", // Restrict country to Jordan
                admin_area_2: "Amman",
              },
            },
          },
        ],
      })
      .catch((error) => {
        // Handle errors during order creation
        setErrorMessage("Failed to create order. Please try again later.");
        console.error("Create Order Error:", error);
      });
  };
  const handleApprove = (data, actions) => {
    return actions.order
      .authorize()
      .then((details) => {
        console.log("details:", details);
        onPaymentSuccess(); // Trigger callback to parent on successful payment
        handleClose();
      })
      .catch((error) => {
        // Handle errors during capture
        setErrorMessage("Payment approval failed. Please try again.");
        console.error("Payment Capture Error:", error);
      });
  };
  const handleError = (error) => {
    console.error("PayPal Button Error:", error);
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
            intent: "authorize",
          }}
        >
          <PayPalButtons
            createOrder={createOrder}
            onApprove={handleApprove}
            fundingSource={undefined}
            onError={handleError}
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
