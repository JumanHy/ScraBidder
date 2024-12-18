import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Button,
  Image,
  Badge,
  Dropdown,
  Modal,
  Stack,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { Bell, Dot } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";

import logo from "@/assets/images/ScraBidderLogo.png";
import userImage from "@/assets/images/UserImage.png";

import formatTimeAgo from "../../helpers/formatTimeAgo";
import { HubConnectionBuilder } from "@microsoft/signalr";

function NavBar() {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");
  const roleData = localStorage.getItem("role");
  const navigate = useNavigate();
  const val = !!token;
  const [isLoggedIn, setIsLoggedIn] = useState(val);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsLoggedIn(val);
  }, [val]);

  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!isLoggedIn) {
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:5192/api/notifications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // Establish SignalR connection
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5192/notificationHub", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        newConnection.on("ReceiveNotification", (message) => {
          setNotifications((prev) => [message, ...prev]);
        });
        setConnection(newConnection);
      })
      .catch((err) => console.error("SignalR connection error:", err));

    return () => {
      newConnection.stop();
    };
  }, [isLoggedIn]);

  const handleNotificationClick = async (index) => {
    if (!connection) {
      console.error("SignalR connection not established");
      return;
    }

    try {
      await connection.invoke("MarkNotificationAsRead", index);
      setNotifications((prev) => {
        const updated = [...prev];
        updated[index].isRead = true;
        return updated;
      });
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="md" className="bg-light shadow-lg fixed-top">
        <Container fluid>
          <Col xs={2} md={2}>
            <LinkContainer to="/">
              <Navbar.Brand className="d-flex align-items-center gap-1">
                <Image fluid src={logo} style={{ maxWidth: "50px" }} />
                <span className="fs-6 fw-bold text-primary">ScraBidder</span>
              </Navbar.Brand>
            </LinkContainer>
          </Col>
          <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" />
          {isLoggedIn ? (
            <Col xs={{ span: "auto" }} md={{ order: "last" }}>
              {roleData !== "Admin" ? ( // Check for "Admin" role
                <Stack direction="horizontal" className="gap-2">
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="notifications-dropdown">
                      <Bell size={24} color="black" />
                      {notifications &&
                        notifications?.filter((n) => !n.isRead).length > 0 && (
                          <Badge
                            pill
                            bg="danger"
                            className="position-absolute top-0 translate-middle"
                          >
                            {notifications.filter((n) => !n.isRead).length}
                          </Badge>
                        )}
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      align={"end"}
                      style={{
                        maxHeight: "400px",
                        overflowY: "auto",
                        width: "50px",
                      }}
                    >
                      <Dropdown.Header>Notifications</Dropdown.Header>
                      {notifications && notifications?.length > 0 ? (
                        notifications.map((notification, index) => (
                          <Dropdown.Item
                            key={index}
                            className={`d-flex justify-content-between text-wrap py-3 px-3 ${
                              !notification.isRead ? "bg-primary-subtle" : ""
                            }`}
                            onClick={() => handleNotificationClick(index)}
                          >
                            <span>
                              {notification.message}
                              <span
                                className="fw-lighter fst-italic fs-6"
                                style={{ color: "#005092" }}
                              >
                                <Dot />
                                {formatTimeAgo(notification.createdAt)}
                              </span>
                            </span>
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>
                          No new notifications
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <span>
                    <Image
                      src={userImage}
                      roundedCircle
                      width={30}
                      height={30}
                    />
                  </span>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="secondary"
                      className="border-0 bg-transparent p-0"
                    />
                    <Dropdown.Menu>
                      <LinkContainer
                        to={
                          roleData === "Business"
                            ? "/business-account"
                            : "/user-account"
                        }
                      >
                        <Dropdown.Item>My Account</Dropdown.Item>
                      </LinkContainer>

                      {roleData === "Business" && (
                        <LinkContainer to={`/cprofile/${userId}`}>
                          <Dropdown.Item>My Profile</Dropdown.Item>
                        </LinkContainer>
                      )}
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Stack>
              ) : (
                <LinkContainer to="/Dashboard">
                  <Button variant="primary" className="w-100 text-white">
                    Dashboard
                  </Button>
                </LinkContainer>
              )}
            </Col>
          ) : (
            <Col xs="auto" md={{ order: "last" }}>
              <LinkContainer to="/login">
                <Button variant="secondary" className="w-100 text-white">
                  Login/Register
                </Button>
              </LinkContainer>
            </Col>
          )}
          <Col xs={12} md={5}>
            <Navbar.Collapse
              className="justify-content-between"
              id="basic-navbar-nav"
            >
              <Nav className="m-start gap-md-3 text-center">
                <LinkContainer to="/">
                  <Nav.Link className="text-primary">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/results">
                  <Nav.Link className="text-primary">Auctions</Nav.Link>
                </LinkContainer>
                <Nav.Link className="text-primary">Help & Support</Nav.Link>
                <Nav.Link className="text-primary">About Us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
