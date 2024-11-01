import React from "react";
import { Accordion, ListGroup } from "react-bootstrap";

function Details() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="text-primary">Details</Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <ListGroup.Item className="text-primary">
              <strong>Condition:</strong> New
            </ListGroup.Item>
            <ListGroup.Item className="text-primary">
              <strong>Category:</strong> Aluminum
            </ListGroup.Item>
            <ListGroup.Item className="text-primary">
              <strong>Quantity:</strong> 1 ton
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Details;
