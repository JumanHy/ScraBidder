// Sidebar.js
import React, { useState } from "react";
import { Offcanvas, Nav, Button } from "react-bootstrap";

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="m-3">
        Open Sidebar
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="/edit-info">Edit My Info</Nav.Link>
            <Nav.Link href="/interested">Interested</Nav.Link>
            <Nav.Link href="/my-wallet">My Wallet</Nav.Link>
            <Nav.Link href="/previous-purchases">Previous Purchases</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
