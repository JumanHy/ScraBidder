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
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Bell, Dot, Upload } from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "@/assets/images/ScraBidderLogo.png";
import userImage from "@/assets/images/UserImage.png";
import { useEffect, useState } from "react";
import axios from "axios"; // Importing Axios
import "./style.css";
import formatTimeAgo from "../../helpers/formatTimeAgo";

function NavBar() {
  const [notifications, setNotifications] = useState([]);
  const [isLogedin, setIsLogedin] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [showModal, setShowModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [connection, setConnection] = useState(null); // Track the connection instance

  const role = "business"; // Or get this dynamically as needed

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch notifications on mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5192/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data); // Set the fetched notifications in state
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // Establish SignalR connection
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5192/notificationHub", {
        accessTokenFactory: () => token,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("SignalR connected");

        // Register listener for ReceiveNotification
        newConnection.on("ReceiveNotification", (message) => {
          console.log("Notification received:", message);
          setNotifications((prevNotifications) => [
            message,
            ...prevNotifications,
          ]);
        });

        setConnection(newConnection); // Store the connection for reuse
      })
      .catch((err) => console.error("SignalR connection error:", err));

    // Cleanup connection on component unmount
    return () => {
      newConnection.stop();
    };
  }, []);

  const handleNotificationClick = async (index) => {
    if (!connection) {
      console.error("SignalR connection not established");
      return;
    }

    // Mark the notification as read in the backend (SignalR call)
    try {
      await connection.invoke("MarkNotificationAsRead", index);

      // Mark the notification as read locally
      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications];
        updatedNotifications[index].isRead = true;
        return updatedNotifications;
      });
    } catch (err) {
      console.error("Error marking notification as read:", err);
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
          {isLogedin && (
            <Col xs={{ span: "auto" }} md={{ order: "last" }}>
              <Stack direction="horizontal" className="gap-2">
                <Dropdown className="position-relative">
                  <Dropdown.Toggle variant="link" id="notifications-dropdown">
                    <Bell size={24} color="black" />
                    {notifications.filter((n) => !n.isRead).length > 0 && (
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
                    align="end"
                    className="rounded-4 "
                    style={{
                      maxHeight: "400px",
                      overflowY: "auto",
                    }}
                  >
                    <Dropdown.Header>Notifications</Dropdown.Header>
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <Dropdown.Item
                          key={index}
                          className={`d-flex justify-content-between text-wrap py-3 px-3 ${
                            !notification.isRead ? "bg-primary-subtle" : ""
                          }`}
                          onClick={() => handleNotificationClick(index)}
                        >
                          <span className="d-flex ">
                            <span className="d-flex flex-column">
                              <span>{notification.message}</span>
                              <span
                                className="fw-lighter fst-italic fs-6"
                                style={{ color: "#005092" }}
                              >
                                <Dot />
                                {formatTimeAgo(notification.createdAt)}
                              </span>
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

                {/* Profile Image */}
                <span onClick={handleShowModal} style={{ cursor: "pointer" }}>
                  <Image
                    src={userImage}
                    roundedCircle
                    width={30}
                    height={30}
                    alt="User"
                  />
                </span>

                <Dropdown align="end" drop="down-start">
                  <Dropdown.Toggle
                    variant="secondary"
                    id="Dropdown-basic"
                    className="border-0 bg-transparent p-0"
                  >
                    {/* Empty Toggle for Dropdown Arrow */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      href={
                        role === "business"
                          ? "/business-account"
                          : "/user-account"
                      }
                    >
                      My Account
                    </Dropdown.Item>
                    {role === "business" && (
                      <Dropdown.Item href="/cprofile">My Profile</Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => setIsLogedin(false)}>
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Navbar.Toggle
                  className="ms-auto"
                  aria-controls="basic-navbar-nav"
                />
              </Stack>
            </Col>
          )}
          {!isLogedin && (
            <Navbar.Toggle
              className="ms-auto"
              aria-controls="basic-navbar-nav"
            />
          )}
          <Col xs={12} md={isLogedin ? "5" : "8"}>
            <Navbar.Collapse
              className="justify-content-between"
              id="basic-navbar-nav"
            >
              <Nav className="m-start gap-md-3 text-center">
                <LinkContainer to="/">
                  <Nav.Link className="nav-link text-primary">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/results">
                  <Nav.Link className="nav-link text-primary">
                    Auctions
                  </Nav.Link>
                </LinkContainer>
                <Nav.Link className="nav-link text-primary">
                  Help & Support
                </Nav.Link>
                <Nav.Link className="nav-link text-primary">About Us</Nav.Link>
              </Nav>

              <div>
                {!isLogedin && (
                  <LinkContainer to="/login">
                    <Button variant="secondary" className="w-100 text-white">
                      Login/Register
                    </Button>
                  </LinkContainer>
                )}
              </div>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>

      {/* Modal for Enlarged Profile Image with Upload Option */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <Image
            fluid
            src={uploadedImage || userImage}
            style={{
              maxWidth: "150px",
              borderRadius: "50%",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          />
          <br />
          <br />
          <label htmlFor="image-upload" className="btn btn-primary">
            <Upload style={{ marginRight: "5px" }} />
            Change Picture
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
