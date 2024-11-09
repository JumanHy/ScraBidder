import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AuctionRow({ title, startTime, endTime, latestBid, numWatchers, id }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState("");
  const [displayBid, setDisplayBid] = useState("-");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setTimeRemaining(calculateTimeRemaining(now, endTime));
      
      if (now >= new Date(startTime) && now <= new Date(endTime)) {
        setDisplayBid(`$${latestBid}`);
      } else if (now > new Date(endTime)) {
        setDisplayBid(`Last Bid: $${latestBid}`);
      } else {
        setDisplayBid("-");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime, latestBid]);

  function calculateTimeRemaining(current, end) {
    const timeDiff = new Date(end) - current;
    if (timeDiff <= 0) return "Ended";

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <tr style={{ backgroundColor: "#FFFFFF", transition: "background-color 0.3s ease" }}>
      <td style={{ padding: "12px 20px" }}>{title}</td>
      <td style={{ padding: "12px 20px" }}>{new Date(startTime).toLocaleString()}</td>
      <td style={{ padding: "12px 20px" }}>{new Date(endTime).toLocaleString()}</td>
      <td style={{ padding: "12px 20px" }}>{displayBid}</td>
      <td style={{ padding: "12px 20px" }}>{numWatchers}</td>
      <td style={{ padding: "12px 20px" }}>
        {currentTime < new Date(startTime) && <span className="text-secondary fw-bold">Starting Soon</span>}
        {currentTime >= new Date(startTime) && currentTime <= new Date(endTime) && (
          <span className="text-success fw-bold">{timeRemaining}</span>
        )}
        {currentTime > new Date(endTime) && <span className="text-danger fw-bold">Auction Ended</span>}
      </td>
      <td style={{ padding: "12px 20px" }}>
        <Link to={`/auction/${id}`}>
          <Button variant="primary" size="sm">More Details</Button>
        </Link>
      </td>
    </tr>
  );
}

function AuctionList({ auctions }) {
  return (
    <div className="container mt-3">
      <Table
        striped
        responsive
        hover
        className="mt-4"
        style={{
          borderCollapse: "collapse",
          borderRadius: "10px",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#B87333", color: "white", borderBottom: "2px solid #B87333" }}>
            <th style={{ padding: "12px 20px" }}>Title</th>
            <th style={{ padding: "12px 20px" }}>Start Time</th>
            <th style={{ padding: "12px 20px" }}>End Time</th>
            <th style={{ padding: "12px 20px" }}>Latest Bid</th>
            <th style={{ padding: "12px 20px" }}>Watchers</th>
            <th style={{ padding: "12px 20px" }}>Time Remaining</th>
            <th style={{ padding: "12px 20px" }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {auctions.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center" style={{ color: "#888" }}>
                No auctions available.
              </td>
            </tr>
          ) : (
            auctions.map((auction) => (
              <AuctionRow
                key={auction.id}
                title={auction.title}
                startTime={auction.startTime}
                endTime={auction.endTime}
                latestBid={auction.latestBid}
                numWatchers={auction.numWatchers}
                id={auction.id}
              />
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default AuctionList;
