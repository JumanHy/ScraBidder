import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Orders() {
  const [activeTable, setActiveTable] = useState("buyer"); // Default to seller
  const [sellerOrders, setSellerOrders] = useState([]);
  const [buyerOrders, setBuyerOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAuctionId, setSelectedAuctionId] = useState(""); // Auction ID for selection
  const [selectedShipmentId, setSelectedShipmentId] = useState(""); // Shipment ID for status update
  const [newStatus, setNewStatus] = useState(""); // New status for update
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  // Fetch seller orders
  const fetchSellerOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5192/api/shipments/seller",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const groupedData = groupShipmentsByAuctionForSeller(response.data);
      setSellerOrders(groupedData);
    } catch (error) {
      console.error("Error fetching seller orders:", error);
      Swal.fire("Error", "Failed to fetch seller orders.", "error");
    }
    setLoading(false);
  };

  // Fetch buyer orders
  const fetchBuyerOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5192/api/shipments/buyer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const groupedData = groupShipmentsByAuctionForBuyer(response.data);
      setBuyerOrders(groupedData);
    } catch (error) {
      console.error("Error fetching buyer orders:", error);
      Swal.fire("Error", "Failed to fetch buyer orders.", "error");
    }
    setLoading(false);
  };

  // Group shipments by auction ID for buyer
  const groupShipmentsByAuctionForBuyer = (shipments) => {
    const grouped = shipments.reduce((acc, shipment) => {
      const auctionId = shipment.auction.auctionId;
      if (!acc[auctionId]) {
        acc[auctionId] = {
          auction: shipment.auction,
          seller: shipment.seller.sellerName,
          updates: [],
        };
      }
      acc[auctionId].updates.push({
        shipmentId: shipment.shipmentId,
        deliveryStatus: shipment.deliveryStatus,
        createdAt: shipment.createdAt,
      });
      return acc;
    }, {});

    return Object.values(grouped);
  };

  // Group shipments by auction ID for seller
  const groupShipmentsByAuctionForSeller = (shipments) => {
    const grouped = shipments.reduce((acc, shipment) => {
      const auctionId = shipment.auction.auctionId;
      if (!acc[auctionId]) {
        acc[auctionId] = {
          auction: shipment.auction,
          buyer: shipment.buyer.buyerName,
          updates: [],
        };
      }
      acc[auctionId].updates.push({
        shipmentId: shipment.shipmentId,
        deliveryStatus: shipment.deliveryStatus,
        createdAt: shipment.createdAt,
      });
      return acc;
    }, {});

    return Object.values(grouped);
  };

  // Handle status change for shipment
  const handleStatusChange = async () => {
    try {
      if (!selectedShipmentId || !newStatus) {
        return Swal.fire("Error", "Invalid shipment or status.", "error");
      }
      await axios.post(
        `http://localhost:5192/api/shipments/${selectedShipmentId}/update-status`,
        newStatus, // Send the status as a plain string
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure content type is correct
          },
        }
      );
      setSelectedAuctionId("");
      Swal.fire("Success", "Shipment status updated successfully.", "success");
      fetchSellerOrders(); // Refresh seller data
    } catch (error) {
      console.error("Error updating shipment status:", error);
      Swal.fire("Error", "Failed to update shipment status.", "error");
    }
  };

  // Get next status based on current status
  const getNextStatus = (currentStatus) => {
    const statusOrder = ["Pending", "Shipped", "InTransit", "Delivered"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === statusOrder.length - 1) {
      return null; // No next status if already Delivered or invalid status
    }
    return statusOrder[currentIndex + 1];
  };

  // DeliveryStatus mapping
  const DeliveryStatus = {
    Pending: "Pending",
    Shipped: "Shipped",
    InTransit: "In Transit",
    Delivered: "Delivered",
  };

  // Seller Columns
  const sellerColumns = [
    {
      name: "Auction ID",
      selector: (row) => row.auction.auctionId,
      sortable: true,
    },
    {
      name: "Auction Title",
      selector: (row) => row.auction.title,
      sortable: true,
    },
    {
      name: "Buyer Name",
      selector: (row) => row.buyer || "N/A",
      sortable: true,
    },
    {
      name: "Shipment Updates",
      cell: (row) => (
        <div>
          {/* Reverse the updates array to show the most recent first */}
          {row.updates
            .slice()
            .reverse()
            .map((update) => (
              <div key={update.shipmentId} className="mb-2">
                <strong>Status:</strong> {DeliveryStatus[update.deliveryStatus]}{" "}
                <br />
                <strong>Date:</strong>{" "}
                {new Date(update.createdAt).toLocaleString()}
              </div>
            ))}
        </div>
      ),
    },
  ];

  // Buyer Columns
  const buyerColumns = [
    {
      name: "Auction ID",
      selector: (row) => row.auction.auctionId,
      sortable: true,
    },
    {
      name: "Auction Title",
      selector: (row) => row.auction.title,
      sortable: true,
    },
    {
      name: "Seller Name",
      selector: (row) => row.seller || "N/A",
      sortable: true,
    },
    {
      name: "Shipment Updates",
      cell: (row) => (
        <div>
          {/* Reverse the updates array to show the most recent first */}
          {row.updates
            .slice()
            .reverse()
            .map((update) => (
              <div key={update.shipmentId} className="mb-2">
                <strong>Status:</strong> {DeliveryStatus[update.deliveryStatus]}{" "}
                <br />
                <strong>Date:</strong>{" "}
                {new Date(update.createdAt).toLocaleString()}
              </div>
            ))}
        </div>
      ),
    },
  ];

  // Select the latest shipment when auction is selected
  const handleAuctionChange = (auctionId) => {
    setSelectedAuctionId(auctionId);
    const selectedAuction = sellerOrders.find(
      (order) => order.auction.auctionId == auctionId
    );
    if (selectedAuction) {
      // Select the latest shipment (latest by createdAt)
      const latestShipment = selectedAuction.updates.reduce((latest, current) =>
        new Date(latest.createdAt) > new Date(current.createdAt)
          ? latest
          : current
      );
      setSelectedShipmentId(latestShipment.shipmentId);
      // Set the next status
      const nextStatus = getNextStatus(latestShipment.deliveryStatus);
      setNewStatus(nextStatus);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (activeTable === "seller") fetchSellerOrders();
    else fetchBuyerOrders();
  }, [activeTable]);

  return (
    <div>
      {role == "Business" && (
        <div className="d-flex justify-content-center gap-3 mb-4">
          <Button
            variant={activeTable === "seller" ? "primary" : "secondary"}
            onClick={() => setActiveTable("seller")}
          >
            My Auctions
          </Button>

          <Button
            variant={activeTable === "buyer" ? "primary" : "secondary"}
            onClick={() => setActiveTable("buyer")}
          >
            Auctions I Won
          </Button>
        </div>
      )}
      {activeTable === "seller" && role == "Business" && (
        <div className="d-flex justify-content-center mb-4">
          {/* Auction Dropdown */}
          <Form.Select
            className="w-50"
            value={selectedAuctionId}
            onChange={(e) => handleAuctionChange(e.target.value)}
          >
            <option value="">Select Auction</option>
            {sellerOrders.map((order) => (
              <option
                key={order.auction.auctionId}
                value={order.auction.auctionId}
              >
                {order.auction.title} (ID: {order.auction.auctionId})
              </option>
            ))}
          </Form.Select>

          {/* Shipment Status Dropdown */}
          <Button
            variant="success"
            className="ml-3"
            onClick={handleStatusChange}
          >
            Update Status
          </Button>
        </div>
      )}

      <DataTable
        title={
          role == "Business"
            ? activeTable === "seller"
              ? "My Auctions (Seller Orders)"
              : "Auctions I Won (Buyer Orders)"
            : "My Shipments"
        }
        columns={activeTable === "seller" ? sellerColumns : buyerColumns}
        data={activeTable === "seller" ? sellerOrders : buyerOrders}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}
