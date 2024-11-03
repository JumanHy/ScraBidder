import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "../styles/UserProfile.css";

export default function UserProfile() {
  return (
    <div className="user-profile">
      {/* Main Layout */}
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} className=""></Col>

          {/* Main Content Area */}
          <Col md={9} className="content-col">
            <h2>Welcome to Your Dashboard</h2>
            {/* Replace this with routing or conditional rendering to show different sections */}
            <p>Select an option from the sidebar to view more information.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
