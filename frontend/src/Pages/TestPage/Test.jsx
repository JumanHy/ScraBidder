import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5125/api/auction') // Update the endpoint as needed
      .then((response) => {
        setAuctions(response.data); // Assuming response.data is an array of auctions
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>List of Auctions</h1>
      {loading && <div>Loading...</div>}
      {error && <div>An error occurred...</div>}
      {!loading && !error && (
        <div>
          {auctions.map((auction) => (
            <div key={auction.auctionId} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
              <h2>{auction.title}</h2>
              <p><strong>Description:</strong> {auction.description}</p>
              <p><strong>Category:</strong> {auction.category?.categoryName || 'N/A'}</p>
              <p><strong>Condition:</strong> {auction.condition}</p>
              <p><strong>Starting Bid:</strong> ${auction.startingBid}</p>
              <p><strong>Current Bid:</strong> ${auction.currentBid}</p>
              <p><strong>Reserve Price:</strong> ${auction.reservePrice}</p>
              <p><strong>Quantity:</strong> {auction.quantity}</p>
              <p><strong>Seller:</strong> {auction.seller?.email || 'N/A'}</p>
              <p><strong>Address:</strong> {auction.address}</p>
              <p><strong>Start Time:</strong> {new Date(auction.startingTime).toLocaleString()}</p>
              <p><strong>End Time:</strong> {new Date(auction.endingTime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
