import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuctionList() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Replace with dynamic userId logic
  const apiUrl = `http://localhost:5192/api/auction/user/${userId}`;

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(apiUrl, { headers });
        setAuctions(response.data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [apiUrl]);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      center: true,
    },
    {
      name: "Category",
      selector: (row) => row.category.categoryName,
      sortable: true,
      center: true,
    },
    {
      name: "Start Time",
      selector: (row) => new Date(row.startingTime).toLocaleString(),
      sortable: true,
      center: true,
    },
    {
      name: "End Time",
      selector: (row) => new Date(row.endingTime).toLocaleString(),
      sortable: true,
      center: true,
    },
    {
      name: "Latest Bid",
      selector: (row) => `$${row.currentBid}`,
      sortable: true,
      center: true,
    },
    {
      name: "Watchers",
      selector: (row) => row.watchers,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`fw-bold ${
            row.auctionStatus === "Approved"
              ? "text-success"
              : row.auctionStatus === "Ended"
              ? "text-danger"
              : ""
          }`}
        >
          {row.auctionStatus}
        </span>
      ),
      center: true,
    },
    {
      name: "Details",
      cell: (row) => (
        <button
          className="btn btn-primary btn-sm"
          style={{ borderRadius: "10px" }}
          onClick={() => navigate(`/auction/${row.auctionId}`)}
        >
          More Details
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      center: true,
    },
  ];

  return (
    <div className="container mt-4">
      <h1 style={{ color: "#003A70", fontSize: "30px" }}>My Auctions</h1>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/auction-form")}
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
      </div>

      <DataTable
        responsive
        columns={columns}
        data={auctions}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        noHeader
        style={{
          borderCollapse: "collapse",
          borderRadius: "10px",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
        }}
      />
    </div>
  );
}

export default AuctionList;
