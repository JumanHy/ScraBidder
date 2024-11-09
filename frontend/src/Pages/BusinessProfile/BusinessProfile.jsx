import React, { useState, useEffect } from 'react';
import BAcountSidebar from '../../components/BAcountSidebar/BAcountSidebar';
import WatchList from '../../components/WatchList/WatchList';
import TransactionHistory from '../../components/TransactionHistory/TransactionHistory';
import PaymentMethods from '../../components/PaymentMethods/PaymentMethods';
import Myauctions from '../../components/Myauctions/Myauctions';
import UserDetails from '../../components/UserDetails/UserDetails';

function BusinessProfile() {
  const [activeSection, setActiveSection] = useState("dashboard"); // Default to 'dashboard' section
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock auction data
  const auctionsData = [
    {
      id: 1,
      title: "Scrap Metal",
      startTime: "2024-11-15T10:00:00Z",
      endTime: "2024-11-16T10:00:00Z",
      startingBid: 50,
      currentBid: 100,
      numBidders: 5,
      numWatchers: 10,
      image: "https://placehold.co/600x400",
    },
    {
      id: 2,
      title: "Old Machinery",
      startTime: "2024-11-16T12:00:00Z",
      endTime: "2024-11-17T12:00:00Z",
      startingBid: 200,
      currentBid: 300,
      numBidders: 3,
      numWatchers: 8,
      image: "https://placehold.co/600x400",
    },
  ];

  // Simulating an API call to fetch auctions data
  useEffect(() => {
    setTimeout(() => {
      setAuctions(auctionsData); // Replace with your actual API call
      setLoading(false);
    }, 2000); // Simulate a 2-second delay
  }, []);

  // Function to render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to your business dashboard!</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                <h4>Total Watchlist Items</h4>
                <p>12 items</p>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                <h4>Total Transactions</h4>
                <p>35 transactions</p>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                <h4>Current Balance</h4>
                <p>$540.00</p>
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
            <Myauctions/>
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
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <BAcountSidebar setActiveSection={setActiveSection} />

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: '20px' }}>
          {renderContent()} {/* Render content based on active section */}
        </div>
      </div>
    </div>
  );
}

export default BusinessProfile;
