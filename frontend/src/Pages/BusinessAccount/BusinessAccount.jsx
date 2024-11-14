import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import BAcountSidebar from "../../components/BAcountSidebar/BAcountSidebar";
import WatchList from "../../components/WatchList/WatchList";
import TransactionHistory from "../../components/TransactionHistory/TransactionHistory";
import PaymentMethods from "../../components/PaymentMethods/PaymentMethods";
import MyAuctions from "../../components/Myauctions/Myauctions";
import UserDetails from "../../components/UserDetails/UserDetails";
import "../../styles/BusinessAccount.css";
import BusinessDashboard from "../../components/BusinessDashboard/BusinessDashboard";
import "../../styles/animations.css"; 

function BusinessProfile() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div key="dashboard">
            <h2 style={{ color: "#003A70" }}>Dashboard</h2>
            <BusinessDashboard />
          </div>
        );
      case "watchlist":
        return <WatchList key="watchlist" />;
      case "MyAuctions":
        return (
          <div className="justify-content-center align-items-center flex-column" style={{ marginTop: "-15px", padding: "0px" }} key="MyAuctions">
            <MyAuctions />
          </div>
        );
      case "transactions":
        return (
          <div key="transactions">
            <h2 style={{ color: "#003A70" }}>Transaction History</h2>
            <TransactionHistory />
          </div>
        );
      case "payment-methods":
        return (
          <div key="payment-methods">
            <h2 style={{ color: "#003A70" }}>Payment Methods</h2>
            <PaymentMethods />
          </div>
        );
      case "settings":
        return (
          <div key="settings">
            <h2 style={{ color: "#003A70" }}>Settings</h2>
            <UserDetails />
          </div>
        );
      default:
        return <p key="default">Select a section from the sidebar.</p>;
    }
  };

  return (
    <div>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <BAcountSidebar
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />

        {/* Main Content Area with Transition */}
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

export default BusinessProfile;
