import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AuctionRow({
  title,
  startTime,
  endTime,
  latestBid,
  numWatchers,
  state,
  id,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState("");
  const [displayBid, setDisplayBid] = useState("-");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setTimeRemaining(calculateTimeRemaining(now, endTime));

      // Show bid only if auction is "STARTED" or "ENDED"
      if (state === "STARTED" || state === "ENDED") {
        setDisplayBid(`$${latestBid}`);
      } else {
        setDisplayBid("-");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime, latestBid, state]);

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
    <tr
      style={{
        backgroundColor: "#FFFFFF",
        transition: "background-color 0.3s ease",
      }}
    >
      <td style={{ padding: "3px 10px", width: "120px", textAlign: "center" }}>
        {title}
      </td>
      <td style={{ padding: "3px 10px", width: "120px", textAlign: "center" }}>
        {new Date(startTime).toLocaleString()}
      </td>
      <td style={{ padding: "3px 10px", width: "120px", textAlign: "center" }}>
        {new Date(endTime).toLocaleString()}
      </td>
      <td style={{ padding: "3px 10px", width: "120px", textAlign: "center" }}>
        {displayBid}
      </td>
      <td style={{ padding: "3px 10px", width: "120px", textAlign: "center" }}>
        {numWatchers}
      </td>
      <td style={{ padding: "3px 10px", width: "120px", textAlign: "center" }}>
        {state === "PENDING" && <span className="fw-bold">Pending</span>}
        {state === "APPROVED" && (
          <span className="text-success fw-bold">Approved</span>
        )}
        {state === "STARTED" && (
          <span className="text-success fw-bold">{timeRemaining}</span>
        )}
        {state === "ENDED" && (
          <span className="text-danger fw-bold">Ended</span>
        )}
      </td>
      <td style={{ padding: "8px 15px", width: "120px", textAlign: "center" }}>
        {state !== "PENDING" && state !== "STARTED" ? (
          <Link to={`/auction`}>
            <Button
              variant="primary"
              size="sm"
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                borderRadius: "10px",
              }}
            >
              More Details
            </Button>
          </Link>
        ) : state === "STARTED" ? (
          <Link to={`/auction`}>
            <Button
              variant="primary"
              size="sm"
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                borderRadius: "10px",
              }}
            >
              More Details
            </Button>
          </Link>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            disabled
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              borderRadius: "10px",
            }}
          >
            Not Available
          </Button>
        )}
      </td>
    </tr>
  );
}

function AuctionList() {
  const auctionItems = [
    {
      id: 1,
      title: "Scrap Metal",
      startTime: "2024-11-15T10:00:00Z",
      endTime: "2024-11-16T10:00:00Z",
      latestBid: 100,
      numWatchers: 10,
      state: "APPROVED",
    },
    {
      id: 2,
      title: "Old Machinery",
      startTime: "2024-11-16T12:00:00Z",
      endTime: "2024-11-17T12:00:00Z",
      latestBid: 300,
      numWatchers: 8,
      state: "PENDING",
    },
    {
      id: 3,
      title: "Industrial Scrap",
      startTime: "2024-11-18T12:00:00Z",
      endTime: "2024-11-19T12:00:00Z",
      latestBid: 220,
      numWatchers: 12,
      state: "STARTED",
    },
    {
      id: 4,
      title: "Industrial Scrap",
      startTime: "2024-11-10T10:00:00Z",
      endTime: "2024-11-11T10:00:00Z",
      latestBid: 150,
      numWatchers: 5,
      state: "ENDED",
    },
  ];

  return (
    <div className="container mt-1" style={{ marginTop: "30px" }}>
      <div className="d-flex justify-content-between align-items-center">
        <h1 style={{ color: "#003A70", fontSize: "30px" }}>My Auctions</h1>
        <Link to="/auction-form">
          <button
            className="btn btn-secondary my-3 vibrate-button"
            style={{
              width: "150px",
              height: "40px",
              borderRadius: "30px",
              color: "rgba(255, 255, 255, 0.9)",
              padding: "6px",
              fontSize: "15px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            Add New Auction
          </button>
        </Link>
      </div>

      <Table
        striped
        responsive
        hover
        className="mt-3"
        style={{
          borderCollapse: "collapse",
          borderRadius: "10px",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#B87333",
              color: "white",
              borderBottom: "2px solid #B87333",
            }}
          >
            <th style={{ padding: "10px 15px", textAlign: "center" }}>Title</th>
            <th style={{ padding: "10px 15px", textAlign: "center" }}>
              Start Time
            </th>
            <th style={{ padding: "10px 15px", textAlign: "center" }}>
              End Time
            </th>
            <th style={{ padding: "10px 15px", textAlign: "center" }}>
              Latest Bid
            </th>
            <th style={{ padding: "10px 15px", textAlign: "center" }}>
              Watchers
            </th>
            <th style={{ padding: "10px 15px", textAlign: "center" }}>State</th>
            <th style={{ padding: "10px 15px", textAlign: "center" }}>
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {auctionItems.length === 0 ? (
            <tr>
              <td
                colSpan="7"
                className="text-center"
                style={{ color: "#888", padding: "10px" }}
              >
                No auctions available.
              </td>
            </tr>
          ) : (
            auctionItems.map((auction) => (
              <AuctionRow
                key={auction.id}
                title={auction.title}
                startTime={auction.startTime}
                endTime={auction.endTime}
                latestBid={auction.latestBid}
                numWatchers={auction.numWatchers}
                state={auction.state}
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
