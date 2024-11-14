import {
  Container,
  Image,
  Nav,
  Navbar,
  Dropdown,
  Badge,
} from "react-bootstrap";
import logo from "../../assets/images/ScraBidderLogo.png";
import React, { useState } from "react";
import {
  Dot,
  Gear,
  Bell,
  Person,
  BoxArrowRight,
  Hammer,
  Trophy,
  Upload,
  CurrencyDollar,
  ExclamationCircle,
  Envelope,
  CheckCircle,
  Circle,
  ChatDots,
  ChatDotsFill,
} from "react-bootstrap-icons"; // Import Person icon for profile
import "./style.css";

function NavBar() {
  const notifications = [
    {
      id: 1,
      message: "A new bid has been placed on your auction.",
      isRead: false,
      icon: <Hammer size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 2,
      message: "Congratulations! You’ve won the auction.",
      isRead: false,
      icon: <Trophy size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 3,
      message: "Your auction listing is now live.",
      isRead: false,
      icon: <Upload size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 4,
      message: "Payment has been received from the buyer.",
      isRead: false,
      icon: <CurrencyDollar size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 5,
      message: "Your auction has expired without a winning bid.",
      isRead: false,
      icon: <ExclamationCircle size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 6,
      message: "You have a new message from a buyer.",
      isRead: false,
      icon: <Envelope size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 7,
      message: "The status of your auction has been updated to Sold.",
      isRead: false,
      icon: <CheckCircle size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 8,
      message: "A new bid has been placed on your auction.",
      isRead: false,
      icon: <Hammer size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 9,
      message: "Congratulations! You’ve won the auction.",
      isRead: false,
      icon: <Trophy size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 10,
      message: "Your auction listing is now live.",
      isRead: false,
      icon: <Upload size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 11,
      message: "Payment has been received from the buyer.",
      isRead: false,
      icon: <CurrencyDollar size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 12,
      message: "Your auction has expired without a winning bid.",
      isRead: false,
      icon: <ExclamationCircle size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 13,
      message: "You have a new message from a buyer.",
      isRead: false,
      icon: <Envelope size={25} style={{ color: "#005092" }} />,
    },
    {
      id: 14,
      message: "The status of your auction has been updated to Sold.",
      isRead: false,
      icon: <CheckCircle size={25} style={{ color: "#005092" }} />,
    },
  ];

  return (
    <Navbar expand="md" style={{ backgroundColor: "#FAFAFA" }} fixed="top">
      <Container fluid>
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center gap-1"
          style={{ flex: "1" }}
        >
          <Image fluid src={logo} style={{ maxWidth: "50px" }} />
          <span style={{ color: "#003A70" }} className="fs-6 fw-bold">
            ScraBidder
          </span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="dashboard-navbar-nav"
          className="ms-auto"
        />
        <Navbar.Collapse id="dashboard-navbar-nav">
          <Nav className="ms-auto gap-md-3 text-center align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                id="settings-dropdown"
                className="settings-dropdown-toggle"
              >
                <Gear size={24} color="black" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  Account Settings
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">Help</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  href="#/action-4"
                  className="text-danger fw-bold"
                >
                  Logout <BoxArrowRight size={15} className="me-2 ms-2" />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                className="position-relative"
                id="notifications-dropdown"
              >
                <Bell size={24} color="black" />
                {notifications.length > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="rounded-4"
                style={{ maxHeight: "500px", overflowY: "auto" }}
              >
                <Dropdown.Header>Notifications</Dropdown.Header>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <Dropdown.Item
                      key={notification.id}
                      className="d-flex justify-content-between py-3 px-3"
                    >
                      <span className="d-flex ">
                        <span className="me-4">{notification.icon}</span>
                        <span className="d-flex flex-column">
                          <span>{notification.message}</span>
                          <span
                            className="fw-lighter fst-italic fs-6"
                            style={{ color: "#005092" }}
                          >
                            <Dot />
                            10 minutes ago
                          </span>
                        </span>
                      </span>
                      <Dot
                        className="text-end"
                        size={40}
                        style={{ color: "#005092" }}
                      />
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled>No new notifications</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            <Nav
              className="dashnav-link d-flex align-items-center"
              href="#profile"
            >
              <h5 className="mb-0 me-2">Admin Name</h5>
              <Person size={24} color="black" />
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
