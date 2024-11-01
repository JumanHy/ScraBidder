import React, { useState } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";

function BidHistoryModal() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const bids = [
    { bidder: "bidder5", amount: "610JD", dateTime: "2024-10-30 10:15 AM" },
    { bidder: "bidder4", amount: "580JD", dateTime: "2024-10-30 10:15 AM" },
    { bidder: "bidder3", amount: "550JD", dateTime: "2024-10-30 10:15 AM" },
    { bidder: "bidder2", amount: "500JD", dateTime: "2024-10-30 10:15 AM" },
    { bidder: "bidder1", amount: "450JD", dateTime: "2024-10-30 09:45 AM" },
  ];
  const startingPrice = "400JD";

  return (
    <>
      {/* Trigger Button */}
      <Button variant="link" onClick={handleShow} className="p-0">
        5 bids
      </Button>

      {/* Modal */}
      <Modal className="text-primary" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bid History</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
          <ListGroup variant="flush">
            {/* Bid History */}
            {bids.map((bid, index) => (
              <ListGroup.Item key={index}>
                <div>
                  <strong>{bid.bidder}</strong>{" "}
                  <span className="float-end">{bid.amount}</span>
                </div>
                <div style={{ fontSize: "0.9em", color: "gray" }}>
                  {bid.dateTime}
                </div>
              </ListGroup.Item>
            ))}
            {/* Starting Price */}
            <ListGroup.Item>
              <strong>Starting Price</strong>{" "}
              <span className="float-end">{startingPrice}</span>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <div className="w-100 d-flex justify-content-center">
            <Button variant="primary" className="" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BidHistoryModal;
