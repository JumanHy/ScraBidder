import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import SearchBar from "@/components/SearchBar/SearchBar";

const WatchList = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Iron Scrap",
      description: "Heavy-duty iron scrap pieces",
      currentBid: 50,
      remainingTime: "2h 30m",
      category: "Iron",
    },
    {
      id: 2,
      name: "Aluminum Sheets",
      description: "Aluminum sheets with minimal wear.",
      currentBid: 120,
      remainingTime: "5h 15m",
      category: "Aluminum",
    },
    {
      id: 3,
      name: "Plastic Bottles",
      description: "Used plastic bottles suitable for repurposing.",
      currentBid: 75,
      remainingTime: "12h 00m",
      category: "Plastic",
    },
    {
      id: 4,
      name: "Biastic Material",
      description: "Biodegradable biastic material scrap",
      currentBid: 100,
      remainingTime: "8h 45m",
      category: "Biastic",
    },
    {
      id: 5,
      name: "Copper Wire",
      description: "Pure copper wire scrap",
      currentBid: 150,
      remainingTime: "10h 00m",
      category: "Copper",
    },
  ]);

  const handleSortChange = (criteria) => {
    if (criteria === "Price") {
      setItems((prevItems) =>
        [...prevItems].sort((a, b) => a.currentBid - b.currentBid)
      );
    } else if (criteria === "Time") {
      setItems((prevItems) =>
        [...prevItems].sort((a, b) => {
          const aTime = parseInt(a.remainingTime.split("h")[0]);
          const bTime = parseInt(b.remainingTime.split("h")[0]);
          return aTime - bTime;
        })
      );
    }
  };

  const handleRemoveItem = (itemId) => {
    setItems((items) => items.filter((item) => item.id !== itemId));
  };

  return (
    <div className="my-4" style={{ fontFamily: "Lato, sans-serif", color: "#003A70" }}>
      {/* Add SearchBar here, right before the table */}
      <div className="d-flex justify-content-start mb-3" style={{ width: "100%", paddingLeft: "15%", marginTop: "-40px" }}>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <SearchBar />
        </div>
      </div>

      <div className="d-flex justify-content-end mb-3" style={{ marginTop: "-30px" }}>
        <ButtonGroup>
          <Button
            onClick={() => handleSortChange("Price")}
            style={{
              backgroundColor: "#B87333",
              color: "white",
              border: "none",
              marginRight: "5px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#9f6029";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#B87333";
              e.target.style.transform = "scale(1)";
            }}
          >
            Sort by Price
          </Button>
          <Button
            onClick={() => handleSortChange("Time")}
            style={{
              backgroundColor: "#B87333",
              color: "white",
              border: "none",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s, transform 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#9f6029";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#B87333";
              e.target.style.transform = "scale(1)";
            }}
          >
            Sort by Time
          </Button>
        </ButtonGroup>
      </div>

      {items.length === 0 ? (
        <div className="alert alert-warning text-center">No items in your watch list.</div>
      ) : (
        <div className="table-responsive" style={{ marginTop: "0px" , borderRadius: '15px'}}>
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
                <th>Item Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Current Bid</th>
                <th>Time Remaining</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ backgroundColor: "#FFFFFF", transition: "background-color 0.3s ease" }}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td style={{ color: "green" }}>${item.currentBid}</td>
                  <td>{item.remainingTime}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button variant="primary" className="mr-2" style={{ fontSize: "12px", padding: "6px 12px" }}>
                        Bid Now
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(item.id)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: "5px",
                          transition: "transform 0.2s, background-color 0.3s",
                        }}
                      >
                        <FaTrashAlt
                          style={{
                            color: "black",
                            fontSize: "18px",
                            transition: "color 0.1s, transform 0.1s",
                          }}
                          className="trash-icon"
                          onMouseEnter={(e) => (e.target.style.color = "red")}
                          onMouseLeave={(e) => (e.target.style.color = "black")}
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WatchList;
