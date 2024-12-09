import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import DataTable from "react-data-table-component";
import axios from "axios";
import SearchBar from "@/components/SearchBar/SearchBar";

const WatchList = () => {
  const [items, setItems] = useState([]);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");

  const fetchWatchList = async () => {
    if (!token) {
      console.error("Unauthorized");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5192/api/watch-list/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && Array.isArray(response.data)) {
        setItems(
          response.data.map((item) => ({
            id: item.watchId,
            name: item.auction.title,
            description: item.auction.description,
            currentBid: item.auction.currentBid,
            remainingTime: calculateRemainingTime(
              item.auction.startingTime,
              item.auction.endingTime
            ),
            category: item.auction.category.categoryName,
            auctionId: item.auction.auctionId,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching watch list:", error);
    }
  };

  useEffect(() => {
    fetchWatchList();
  }, []);

  const calculateRemainingTime = (startTime, endTime) => {
    const now = new Date();
    const startTimeUtc = new Date(startTime);
    const endTimeUtc = new Date(endTime);

    if (now < startTimeUtc) {
      return "Not Started";
    }

    if (now > endTimeUtc) {
      return "Ended";
    }

    const remainingTimeMs = endTimeUtc - now;
    const days = Math.floor(remainingTimeMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTimeMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleRemoveItem = async (auctionId) => {
    if (!token) {
      console.error("Unauthorized");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5192/api/watch-list/auction/${auctionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setItems((prevItems) =>
          prevItems.filter((item) => item.auctionId !== auctionId)
        );
        setShowRemoveModal(false);
      } else {
        console.error("Failed to remove item:", response.data);
      }
    } catch (error) {
      console.error("Error removing item from watchlist:", error);
    }
  };

  const columns = [
    {
      name: "Auction ID",
      selector: (row) => row.auctionId,
      sortable: true,
      wrap: true,
    },
    {
      name: "Auction Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      wrap: true,
    },
    {
      name: "Current Bid",
      selector: (row) => `${row.currentBid ? `${row.currentBid} JD` : "-"}`,
      sortable: true,
      wrap: true,
    },
    {
      name: "Time Remaining",
      selector: (row) => row.remainingTime,
      sortable: true,
      wrap: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Button
            variant="link"
            onClick={() => {
              setSelectedItem(row);
              setShowRemoveModal(true);
            }}
            style={{ padding: "5px", marginLeft: "10px" }}
          >
            <FaTrashAlt style={{ color: "black", fontSize: "18px" }} />
          </Button>
        </div>
      ),
    },
  ];

  const closeRemoveModal = () => setShowRemoveModal(false);

  return (
    <div
      className="my-4 container"
      style={{ fontFamily: "Lato, sans-serif", color: "#003A70" }}
    >
      <div className="d-flex justify-content-center mb-5">
        <div style={{ width: "100%", maxWidth: "500px", marginTop: "-20px" }}>
          <SearchBar />
        </div>
      </div>

      {/* Scrollable Table Container */}
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
          data={items}
          pagination
          highlightOnHover
          responsive
        />
      </div>

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
            onClick={() => handleRemoveItem(selectedItem?.auctionId)}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WatchList;
