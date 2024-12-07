import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]); // State to hold transactions
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Get userId and token from localStorage
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    // Fetch transaction history from API
    axios
      .get(`http://localhost:5192/api/transaction-history/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the Authorization header
        },
      })
      .then((response) => {
        setTransactions(response.data); // Set the fetched transactions data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError("Error fetching transaction history");
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  // Define columns for the DataTable
  const columns = [
    {
      name: "TID",
      selector: (row) => row.transactionId,
      sortable: true,
      wrap: true,
    },
    {
      name: "Auction ID",
      selector: (row) => row.auction.auctionId,
      cell: (row) => (
        <a
          style={{
            color: "#B87333",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {row.auction.auctionId}
        </a>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "Auction Title",
      selector: (row) => row.auction.title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Amount",
      selector: (row) => `${row.amount} JD`,
      sortable: true,
      wrap: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
      wrap: true,
    },
    {
      name: "Type",
      selector: (row) => row.transactionType,
      sortable: true,
      wrap: true,
    },
    {
      name: "Purpose",
      selector: (row) => row.transactionPurpose,
      sortable: true,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      wrap: true,
    },
  ];

  return (
    <div
      className="my-4"
      style={{ fontFamily: "Lato, sans-serif", color: "#003A70" }}
    >
      {loading ? (
        <div className="text-center" style={{ color: "#888" }}>
          Loading...
        </div>
      ) : error ? (
        <div className="text-center" style={{ color: "red" }}>
          {error}
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center" style={{ color: "#888" }}>
          No transactions available.
        </div>
      ) : (
        <div
          style={{
            overflowX: "auto",
            borderRadius: "15px",
            border: "1px solid #ddd",
            padding: "10px",
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
          }}
        >
          <DataTable
            columns={columns}
            data={transactions}
            pagination
            highlightOnHover
            responsive
          />
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
