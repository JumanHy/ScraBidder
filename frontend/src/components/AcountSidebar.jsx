import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import {  FaEye, FaHistory, FaCreditCard, FaCog } from 'react-icons/fa';

const AccountSidebar = ({ setActiveSection }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

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
    cursor: "pointer"
  });

  return (
    <div
      style={{
        width: "200px",
        minHeight: "100vh",
        backgroundColor: "#003A70",
        padding: "0px",
        color: "white",
      }}
    >
      <Nav className="flex-column">
        

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

        <Nav.Item style={{ marginBottom: "10px" }}>
          <div
            style={linkStyle(hoveredItem === "payment-methods")}
            onMouseEnter={() => setHoveredItem("payment-methods")}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => setActiveSection("payment-methods")}
          >
            <FaCreditCard /> Payment Methods
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
  );
};

export default AccountSidebar;
