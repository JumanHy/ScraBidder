import React, { useState } from 'react';
import BAcountSidebar from '../../components/BAcountSidebar/BAcountSidebar';
import WatchList from '../../components/WatchList/WatchList';
import TransactionHistory from '../../components/TransactionHistory/TransactionHistory';
import PaymentMethods from '../../components/PaymentMethods/PaymentMethods';
import Myauctions from '../../components/Myauctions/Myauctions';  // Import Myauctions
import UserDetails from '../../components/UserDetails/UserDetails';

function BusinessProfile() {
  const [activeSection, setActiveSection] = useState("dashboard"); // Default to 'dashboard' section


  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to your business dashboard!</p>
            <div style={{ display: "flex", gap: "20px" }}>
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                }}
              >
                <h4>Total Watchlist Items</h4>
                <p>12 items</p>
              </div>
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                }}
              >
                <h4>Total Transactions</h4>
                <p>35 transactions</p>
              </div>
              
                
        
            </div>
          </div>
        );
      case "watchlist":
        return <WatchList />;
      case "MyAuctions":
        return (
          <div>
            <h2>My Auctions</h2>
          
            <Myauctions />  
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
            <h2>Payment Methods</h2>
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
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <BAcountSidebar setActiveSection={setActiveSection} />

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: "20px" ,color:"#003A70"}}>
          {renderContent()} {/* Render content based on active section */}
        </div>
      </div>
    </div>
  );
}

export default BusinessProfile;
