import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import BAcountSidebar from "../../components/BAcountSidebar/BAcountSidebar";
import WatchList from "../../components/WatchList/WatchList";
import TransactionHistory from "../../components/TransactionHistory/TransactionHistory";
import MyAuctions from "../../components/Myauctions/Myauctions";
import UserDetails from "../../components/UserDetails/UserDetails";
import Orders from "../../components/Orders/Orders"; // Import Orders component
import "../../styles/BusinessAccount.css";
import BusinessDashboard from "../../components/BusinessDashboard/BusinessDashboard";
import "../../styles/animations.css";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";

function BusinessProfile() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const userRole = localStorage.getItem("role");

  const navigate = useNavigate();
  if (userRole != "Business") {
    return (
      <Container
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "100vh", textAlign: "center" }}
      >
        <Alert variant="danger" className="w-50">
          <h4 className="mb-3">Access Denied</h4>
          <p className="mb-3">
            You do not have the necessary permissions to access this page.
          </p>
        </Alert>
        <Button variant="primary" onClick={() => navigate("/")}>
          Go Back to Home
        </Button>
      </Container>
    );
  }
  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div key="dashboard" className="m-4">
            <h2 style={{ color: "#003A70" }}>Dashboard</h2>
            <BusinessDashboard />
          </div>
        );
      case "watchlist":
        return (
          <div key="watchlist" className="m-4">
            <h2 style={{ color: "#003A70" }}>Watch List</h2>
            <WatchList />
          </div>
        );

      case "MyAuctions":
        return (
          <div key="MyAuctions" className="m-4">
            <MyAuctions />
          </div>
        );
      case "transactions":
        return (
          <div key="transactions" className="m-4">
            <h2 style={{ color: "#003A70" }}>Transaction History</h2>
            <TransactionHistory />
          </div>
        );
      case "orders": // New case for Orders
        return (
          <div key="orders" className="m-4">
            <h2 style={{ color: "#003A70" }}>Orders</h2>
            <Orders />
          </div>
        );
      case "settings":
        return (
          <div key="settings" className="m-4">
            <h2 style={{ color: "#003A70" }}>Settings</h2>
            <UserDetails />
          </div>
        );
      default:
        return <p key="default">Select a section from the sidebar.</p>;
    }
  };

  return (
    <Container fluid>
      <Row className="">
        {/* Sidebar */}
        <Col xs={2} sm={3} className="p-0">
          <BAcountSidebar
            setActiveSection={setActiveSection}
            activeSection={activeSection}
          />
        </Col>

        {/* Main Content Area with Transition */}
        <Col xs={10} sm={9} style={{ color: "#003A70" }}>
          <TransitionGroup>
            <CSSTransition
              key={activeSection}
              timeout={300} // Duration of the animation
              classNames="fade" // Class names for animation
            >
              {renderContent()}
            </CSSTransition>
          </TransitionGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default BusinessProfile;
