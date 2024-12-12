import React, { useState } from "react";
import AcountSidebar from "../components/AcountSidebar";
import WatchList from "../components/WatchList/WatchList";
import Usersetting from "../components/Usersetting";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./../styles/animations.css";
import Orders from "../components/Orders/Orders";
import { Alert, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function UserAccount() {
  const [activeSection, setActiveSection] = useState("watchlist"); // Default to 'watchlist' section
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  if (userRole != "Individual") {
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
      case "watchlist":
        return (
          <div>
            <WatchList /> {/* Render the actual WatchList component */}
          </div>
        );
      case "transactions":
        return (
          <div>
            <h2>Transaction History</h2>
            <TransactionHistory />
          </div>
        );
      case "orders":
        return (
          <div>
            <h2>Orders</h2>
            <Orders />
          </div>
        );
      case "settings":
        return (
          <div>
            <Usersetting />
          </div>
        );
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div>
      {/* Navbar */}
      {/* <NavBar /> */}

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <AcountSidebar setActiveSection={setActiveSection} />

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: "20px", color: "#003A70" }}>
          <TransitionGroup>
            <CSSTransition
              key={activeSection}
              timeout={300} // Duration of the animation
              classNames="fade" // Class names for animation
            >
              {renderContent()}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
