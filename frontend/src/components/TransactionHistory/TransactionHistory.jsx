import React from "react";

const TransactionHistory = () => {
  // Sample transaction data (replace with actual data as needed)
  const transactions = [
    {
      id: "TX12345",
      auctionId: "AUC001",
      date: "2024-11-06",
      itemName: "Iron Scrap",
      amount: 50,
      status: "Completed",
    },
    {
      id: "TX12346",
      auctionId: "AUC002",
      date: "2024-11-05",
      itemName: "Copper Wire",
      amount: 150,
      status: "Pending",
    },{
      id: "TX12345",
      auctionId: "AUC001",
      date: "2024-11-06",
      itemName: "Iron Scrap",
      amount: 50,
      status: "Completed",
    },{
      id: "TX12345",
      auctionId: "AUC001",
      date: "2024-11-06",
      itemName: "Iron Scrap",
      amount: 30,
      status: "Completed",
    },{
      id: "TX12345",
      auctionId: "AUC001",
      date: "2024-11-06",
      itemName: "Iron Scrap",
      amount: 50,
      status: "Completed",
    },{
      id: "TX12345",
      auctionId: "AUC001",
      date: "2024-11-06",
      itemName: "Iron Scrap",
      amount: 40,
      status: "Completed",
    },
  ];

  return (
    <div className="my-4" style={{ fontFamily: "Lato, sans-serif", color: "#003A70" }}>
      <div className="table-responsive" style={{ marginTop: "0px", borderRadius: "15px" }}>
        <table
          className="table table-striped table-hover"
          style={{
            borderRadius: "10px",
            border: "1px solid #ddd",
            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#B87333", color: "white", borderBottom: "2px solid #B87333" }}>
              <th>Transaction ID</th>
              <th>Auction ID</th>
              <th>Date</th>
              <th>Item Name</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center" style={{ color: "#888" }}>
                  No transactions available.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id} style={{ backgroundColor: "#FFFFFF", transition: "background-color 0.3s ease" }}>
                  <td>{transaction.id}</td>
                  <td>
                    <a
                      href={`/auctions/${transaction.auctionId}`} // Replace with the correct route
                      style={{ color: "#B87333", textDecoration: "underline", cursor: "pointer" }}
                    >
                      {transaction.auctionId}
                    </a>
                  </td>
                  <td>{transaction.date}</td>
                  <td>{transaction.itemName}</td>
                  <td style={{ color: "green" }}>${transaction.amount}</td>
                  <td>{transaction.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
