import React, { useState } from "react";
import { Nav, Button, Offcanvas } from "react-bootstrap";
import {
  FaChartBar,
  FaEye,
  FaHistory,
  FaShippingFast,
  FaCog,
  FaGavel,
} from "react-icons/fa"; // Import FaGavel icon

const BAcountSidebar = ({ setActiveSection }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false); // State for Offcanvas

  // Function to handle link style
  const linkStyle = (isHovered) => ({
    color: "white",
    fontSize: "14px",
    fontFamily: "Lato, sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: isHovered ? "#0055A4" : "transparent",
    padding: "10px 15px",
    width: "100%",
    textDecoration: "none",
    cursor: "pointer",
  });

  return (
    <>
      {/* Button to toggle the Offcanvas sidebar on mobile */}
      <Button
        variant="primary"
        className="d-md-none" // Hide on larger screens
        onClick={() => setShowSidebar(true)}
        style={{ marginLeft: "10px", marginTop: "10px" }}
      >
        Menu
      </Button>

      {/* Offcanvas Sidebar for Mobile */}
      <Offcanvas
        className="bg-primary"
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="start"
      >
        <Offcanvas.Header className="text-white" closeButton>
          <Offcanvas.Title>Account Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Item style={{ marginBottom: "10px" }}>
              <div
                style={linkStyle(hoveredItem === "dashboard")}
                onMouseEnter={() => setHoveredItem("dashboard")}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveSection("dashboard")}
              >
                <FaChartBar /> Dashboard
              </div>
            </Nav.Item>

            <Nav.Item style={{ marginBottom: "10px" }}>
              <div
                style={linkStyle(hoveredItem === "watchlist")}
                onMouseEnter={() => setHoveredItem("watchlist")}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveSection("watchlist")}
              >
                <FaEye /> Watch List
              </div>
            </Nav.Item>

            <Nav.Item style={{ marginBottom: "10px" }}>
              <div
                style={linkStyle(hoveredItem === "transactions")}
                onMouseEnter={() => setHoveredItem("transactions")}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveSection("transactions")}
              >
                <FaHistory /> Transaction History
              </div>
            </Nav.Item>

            {/* Add "My Auction" Nav Item with FaGavel icon here */}
            <Nav.Item style={{ marginBottom: "10px" }}>
              <div
                style={linkStyle(hoveredItem === "MyAuctions")}
                onMouseEnter={() => setHoveredItem("MyAuctions")}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveSection("MyAuctions")}
              >
                <FaGavel /> My Auctions
              </div>
            </Nav.Item>

            <Nav.Item>
              <div
                style={linkStyle(hoveredItem === "orders")}
                onMouseEnter={() => setHoveredItem("orders")}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveSection("orders")}
              >
                <FaShippingFast /> Orders
              </div>
            </Nav.Item>
            <Nav.Item style={{ marginBottom: "10px" }}>
              <div
                style={linkStyle(hoveredItem === "settings")}
                onMouseEnter={() => setHoveredItem("settings")}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setActiveSection("settings")}
              >
                <FaCog /> Settings
              </div>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar for Larger Screens */}
      <div
        style={{
          width: "250px", // Set a smaller width for large screens
          minHeight: "100vh",
        }}
        className="d-none d-md-block  bg-primary p-0 text-white" // Only show on larger screens
      >
        <Nav className="flex-column sticky-top">
          <Nav.Item style={{ marginBottom: "10px" }}>
            <div
              style={linkStyle(hoveredItem === "dashboard")}
              onMouseEnter={() => setHoveredItem("dashboard")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setActiveSection("dashboard")}
            >
              <FaChartBar /> Dashboard
            </div>
          </Nav.Item>

          <Nav.Item style={{ marginBottom: "10px" }}>
            <div
              style={linkStyle(hoveredItem === "watchlist")}
              onMouseEnter={() => setHoveredItem("watchlist")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setActiveSection("watchlist")}
            >
              <FaEye /> Watch List
            </div>
          </Nav.Item>

          <Nav.Item style={{ marginBottom: "10px" }}>
            <div
              style={linkStyle(hoveredItem === "transactions")}
              onMouseEnter={() => setHoveredItem("transactions")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setActiveSection("transactions")}
            >
              <FaHistory /> Transaction History
            </div>
          </Nav.Item>

          {/* Add "My Auction" Nav Item with FaGavel icon here */}
          <Nav.Item style={{ marginBottom: "10px" }}>
            <div
              style={linkStyle(hoveredItem === "MyAuctions")}
              onMouseEnter={() => setHoveredItem("MyAuctions")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setActiveSection("MyAuctions")}
            >
              <FaGavel /> My Auctions
            </div>
          </Nav.Item>

          <Nav.Item>
            <div
              style={linkStyle(hoveredItem === "orders")}
              onMouseEnter={() => setHoveredItem("orders")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setActiveSection("orders")}
            >
              <FaShippingFast /> Orders
            </div>
          </Nav.Item>
          <Nav.Item style={{ marginBottom: "10px" }}>
            <div
              style={linkStyle(hoveredItem === "settings")}
              onMouseEnter={() => setHoveredItem("settings")}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setActiveSection("settings")}
            >
              <FaCog /> Settings
            </div>
          </Nav.Item>
        </Nav>
      </div>
    </>
  );
};

export default BAcountSidebar;
