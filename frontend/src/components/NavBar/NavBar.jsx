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
//import { HubConnectionBuilder } from "@microsoft/signalr";
import { Bell, Dot, Upload } from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";

import logo from "@/assets/images/ScraBidderLogo.png";
import userImage from "@/assets/images/UserImage.png";
import "./style.css";
import formatTimeAgo from "../../helpers/formatTimeAgo";

function NavBar() {
  //const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("authToken");
  const roleData = localStorage.getItem("role");
  console.log({ roleData });

  const val = !!token;
  const [isLoggedIn, setIsLoggedIn] = useState(val);
  // const [role, setRole] = useState(roleData);

  const [showModal, setShowModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    setIsLoggedIn(val);
  }, [val]);

  //const [connection, setConnection] = useState(null);

  // Placeholder for role. Fetch this dynamically.

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5192/api/notifications",
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //       setNotifications(response.data);
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     }
  //   };

  //   fetchNotifications();

  //   // Establish SignalR connection
  //   const newConnection = new HubConnectionBuilder()
  //     .withUrl("http://localhost:5192/notificationHub", {
  //       accessTokenFactory: () => token,
  //     })
  //     .withAutomaticReconnect()
  //     .build();

  //   newConnection
  //     .start()
  //     .then(() => {
  //       console.log("SignalR connected");
  //       newConnection.on("ReceiveNotification", (message) => {
  //         setNotifications((prev) => [message, ...prev]);
  //       });
  //       setConnection(newConnection);
  //     })
  //     .catch((err) => console.error("SignalR connection error:", err));

  //   return () => {
  //     newConnection.stop();
  //   };
  // }, []);

  // const handleNotificationClick = async (index) => {
  //   if (!connection) {
  //     console.error("SignalR connection not established");
  //     return;
  //   }

  //   try {
  //     await connection.invoke("MarkNotificationAsRead", index);
  //     setNotifications((prev) => {
  //       const updated = [...prev];
  //       updated[index].isRead = true;
  //       return updated;
  //     });
  //   } catch (err) {
  //     console.error("Error marking notification as read:", err);
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
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
          {isLoggedIn ? (
            <Col xs={{ span: "auto" }} md={{ order: "last" }}>
              <Stack direction="horizontal" className="gap-2">
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="notifications-dropdown">
                    <Bell size={24} color="black" />
                    {/* {notifications &&
                      notifications?.filter((n) => !n.isRead).length > 0 && (
                        <Badge
                          pill
                          bg="danger"
                          className="position-absolute top-0 translate-middle"
                        >
                          {notifications.filter((n) => !n.isRead).length}
                        </Badge>
                      )} */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                  >
                    <Dropdown.Header>Notifications</Dropdown.Header>
                    {/* {notifications && notifications?.length > 0 ? (
                      notifications.map((notification, index) => (
                        <Dropdown.Item
                          key={index}
                          className={`py-3 px-3 ${
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
                    )} */}
                  </Dropdown.Menu>
                </Dropdown>
                <span
                  onClick={() => setShowModal(true)}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={uploadedImage || userImage}
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
                    <Dropdown.Item
                      href={
                        roleData === "Business"
                          ? "/business-account"
                          : "/user-account"
                      }
                    >
                      My Account
                    </Dropdown.Item>
                    {roleData === "Business" && (
                      <Dropdown.Item href="/cprofile">My Profile</Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Stack>
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
          <Col xs={12} md={isLoggedIn ? 5 : 8}>
            <Navbar.Collapse>
              <Nav className="gap-md-3">
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
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <Image
            src={uploadedImage || userImage}
            roundedCircle
            style={{
              maxWidth: "150px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          />
          <br />
          <label htmlFor="image-upload" className="btn btn-primary">
            <Upload className="me-2" /> Change Picture
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
