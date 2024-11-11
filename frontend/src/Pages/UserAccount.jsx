import React, { useState } from "react";
import AcountSidebar from "../components/AcountSidebar";
import WatchList from "../components/WatchList/WatchList";
import UserDetails from "../components/UserDetails/UserDetails";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";
import PaymentMethods from "../components/PaymentMethods/PaymentMethods";

function UserAccount() {
  const [activeSection, setActiveSection] = useState("watchlist"); // Default to 'watchlist' section

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
      case "payment-methods":
        return (
          <div>
            <PaymentMethods />
          </div>
        );
      case "settings":
        return (
          <div>
            <UserDetails />
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
        <div style={{ flex: 1, padding: "20px" }}>
          {/* Profile Content */}
          {renderContent()} {/* Render content based on active section */}
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
