import React, { useState } from "react";
import BAcountSidebar from "../../components/BAcountSidebar/BAcountSidebar";
import WatchList from "../../components/WatchList/WatchList";
import TransactionHistory from "../../components/TransactionHistory/TransactionHistory";
import PaymentMethods from "../../components/PaymentMethods/PaymentMethods";
import MyAuctions from "../../components/Myauctions/Myauctions";
import UserDetails from "../../components/UserDetails/UserDetails";

function BusinessProfile() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div>
            <h2 style={{ color: "#B87333" }}>Dashboard</h2>
            <br/>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div style={dashboardCardStyle}>
                <h4 style={{ color: "#B87333" }}>Total Watchlist Items</h4>
                <p>12 items</p>
              </div>
              <div style={dashboardCardStyle}>
                <h4 style={{ color: "#B87333" }}>Total Transactions</h4>
                <p>35 transactions</p>
              </div>
              <div style={dashboardCardStyle}>
                <h4 style={{ color: "#B87333" }}>New Bids</h4>
                <p>5 active bids</p>
              </div>
              <div style={dashboardCardStyle}>
                <h4 style={{ color: "#B87333" }}>Notifications</h4>
                <p>3 new alerts</p>
              </div>

              <div style={dashboardCardStyle}>
                <h4 style={{ color: "#B87333" }}>Total Revenue</h4>
                <p>$7,250</p>
              </div>
            </div>
          </div>
        );
      case "watchlist":
        return <WatchList />;
      case "MyAuctions":
        return (
          <div>
            <h2 style={{ color: "#003A70" }}>My Auctions</h2>
            <MyAuctions />
          </div>
        );
      case "transactions":
        return (
          <div>
            <h2 style={{ color: "#003A70" }}>Transaction History</h2>
            <TransactionHistory />
          </div>
        );
      case "payment-methods":
        return (
          <div>
            <h2 style={{ color: "#003A70" }}>Payment Methods</h2>
            <PaymentMethods />
          </div>
        );
      case "settings":
        return (
          <div>
            <h2 style={{ color: "#003A70" }}>Settings</h2>
            <UserDetails />
          </div>
        );
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <BAcountSidebar setActiveSection={setActiveSection} activeSection={activeSection} />

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: "20px", color: "#003A70" }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Styling for cards specifically in the dashboard
const dashboardCardStyle = {
  flex: "1 1 250px",
  padding: "20px",
  backgroundColor: "#FFFFFF", // White background for the dashboard cards
  borderRadius: "8px",
  minWidth: "200px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)", // Shadow for a raised effect
  color: "#333", // Dark color for text for contrast
};

export default BusinessProfile;
