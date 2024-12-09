import React, { useState } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";

function BidHistoryModal({ biddingsList, startingPrice }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  console.log("from history modal");
  console.log(biddingsList);
  return (
    <>
      {/* Trigger Button */}
      <Button variant="link" onClick={handleShow} className="p-0">
        {biddingsList.length} bids
      </Button>

      {/* Modal */}
      <Modal className="text-primary" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bid History</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
          <ListGroup variant="flush">
            {/* Bid History */}
            {biddingsList
              .slice()
              .reverse()
              .map((bid, index) => (
                <ListGroup.Item key={index}>
                  <div>
                    <strong>{bid.username}</strong>{" "}
                    <span className="float-end">{bid.bidAmount} JD</span>
                  </div>
                  <div style={{ fontSize: "0.9em", color: "gray" }}>
                    {bid.bidTime}
                  </div>
                </ListGroup.Item>
              ))}
            {/* Starting Price */}
            <ListGroup.Item>
              <strong>Starting Price</strong>{" "}
              <span className="float-end">{startingPrice} JD</span>
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
