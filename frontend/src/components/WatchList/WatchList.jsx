import React, { useState } from "react";
import { Button, ButtonGroup, Modal, Table } from "react-bootstrap";
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

  const [showBidModal, setShowBidModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
    setShowRemoveModal(false); // Close the modal after removing the item
  };

  const handleBidNow = (item) => {
    setSelectedItem(item);
    setShowBidModal(true);
  };

  const closeBidModal = () => setShowBidModal(false);
  const closeRemoveModal = () => setShowRemoveModal(false);

  return (
    <div className="my-4 container" style={{ fontFamily: "Lato, sans-serif", color: "#003A70" }}>
      {/* SearchBar */}
      <div className="d-flex justify-content-center mb-3">
        <div style={{ width: "100%", maxWidth: "500px",marginTop: "-20px" }}>
          <SearchBar />
        </div>
      </div>

      <div className="d-flex justify-content-end mb-3">
        <ButtonGroup>
          <Button
            onClick={() => handleSortChange("Price")}
            style={{ backgroundColor: "#B87333", color: "white", border: "none", marginRight: "5px" }}
          >
            Sort by Price
          </Button>
          <Button
            onClick={() => handleSortChange("Time")}
            style={{ backgroundColor: "#B87333", color: "white", border: "none" }}
          >
            Sort by Time
          </Button>
        </ButtonGroup>
      </div>

      {items.length === 0 ? (
        <div className="alert alert-warning text-center">No items in your watch list.</div>
      ) : (
        <div className="table-responsive" style={{ borderRadius: "15px" }}>
          <Table
            className="table-striped table-hover"
            responsive="md"
            style={{ borderRadius: "10px", border: "1px solid #ddd", boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#B87333", color: "white" }}>
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
                    <div className="d-flex align-items-center">
                      <Button
                        variant="primary"
                        className="mr-2"
                        style={{ fontSize: "12px", padding: "6px 12px" }}
                        onClick={() => handleBidNow(item)}
                      >
                        Bid Now
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowRemoveModal(true);
                        }}
                        style={{ padding: "5px", marginLeft: "10px" }}
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
          </Table>
        </div>
      )}

      {/* Bid Modal */}
      <Modal show={showBidModal} onHide={closeBidModal}>
        <Modal.Header closeButton>
          <Modal.Title>Place Bid for {selectedItem?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Current bid: ${selectedItem?.currentBid}</p>
          <input
            type="number"
            className="form-control"
            placeholder="Enter your bid"
            min={selectedItem?.currentBid + 1}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeBidModal}>
            Close
          </Button>
          <Button variant="primary">Place Bid</Button>
        </Modal.Footer>
      </Modal>

      {/* Remove Modal */}
      <Modal show={showRemoveModal} onHide={closeRemoveModal}>
        <Modal.Header closeButton>
          <Modal.Title>Remove {selectedItem?.name} from Watchlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this item from your watchlist?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeRemoveModal}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleRemoveItem(selectedItem?.id)}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WatchList;
