import React, { useState } from "react";
import AcountSidebar from "../components/AcountSidebar";
import WatchList from "../components/WatchList/WatchList";
import Usersetting from "../components/Usersetting";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";
import PaymentMethods from "../components/PaymentMethods/PaymentMethods";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./../styles/animations.css"; 
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
