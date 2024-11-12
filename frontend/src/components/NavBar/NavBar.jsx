import {
  Container,
  Col,
  Button,
  Image,
  Badge,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { Dot,Gear, Bell, Person,BoxArrowRight ,Hammer, Trophy, Upload, CurrencyDollar, ExclamationCircle, Envelope, CheckCircle, Circle, ChatDots, ChatDotsFill} from "react-bootstrap-icons"; 
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "@/assets/images/ScraBidderLogo.png";
import { LinkContainer } from "react-router-bootstrap";
import { FaBell } from "react-icons/fa";
import userImage from "@/assets/images/UserImage.png";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook

function NavBar() {
<<<<<<< Updated upstream
  const notifications = [
    { id: 1, message: "A new bid has been placed on your auction.", isRead: false, icon: <Hammer size={25} style={{color:'#005092'}} /> },
    { id: 2, message: "Congratulations! You’ve won the auction.", isRead: false, icon: <Trophy size={25} style={{color:'#005092'}}/> },
    { id: 3, message: "Your auction listing is now live.", isRead: false, icon: <Upload size={25} style={{color:'#005092'}}/> },
    { id: 4, message: "Payment has been received from the buyer.", isRead: false, icon: <CurrencyDollar size={25} style={{color:'#005092'}}/> },
    { id: 5, message: "Your auction has expired without a winning bid.", isRead: false, icon: <ExclamationCircle size={25} style={{color:'#005092'}}/> },
    { id: 6, message: "You have a new message from a buyer.", isRead: false, icon: <Envelope size={25} style={{color:'#005092'}}/> },
    { id: 7, message: "The status of your auction has been updated to Sold.", isRead: false, icon: <CheckCircle size={25} style={{color:'#005092'}}/> },
    { id: 8, message: "A new bid has been placed on your auction.", isRead: false, icon: <Hammer size={25} style={{color:'#005092'}} /> },
    { id: 9, message: "Congratulations! You’ve won the auction.", isRead: false, icon: <Trophy size={25} style={{color:'#005092'}}/> },
    { id: 10, message: "Your auction listing is now live.", isRead: false, icon: <Upload size={25} style={{color:'#005092'}}/> },
    { id: 11, message: "Payment has been received from the buyer.", isRead: false, icon: <CurrencyDollar size={25} style={{color:'#005092'}}/> },
    { id: 12, message: "Your auction has expired without a winning bid.", isRead: false, icon: <ExclamationCircle size={25} style={{color:'#005092'}}/> },
    { id: 13, message: "You have a new message from a buyer.", isRead: false, icon: <Envelope size={25} style={{color:'#005092'}}/> },
    { id: 14, message: "The status of your auction has been updated to Sold.", isRead: false, icon: <CheckCircle size={25} style={{color:'#005092'}}/> }
  ]
  const [isLogedin, setIsLogedin] = useState(true);

  // State for controlling the profile image modal visibility
  const [showModal, setShowModal] = useState(false);
=======
  const [isLogedin, setIsLogedin] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal state for profile image
  const location = useLocation(); // Get current route/location
>>>>>>> Stashed changes

  // Function to open modal
  const handleShowModal = () => setShowModal(true);
  // Function to close modal
  const handleCloseModal = () => setShowModal(false);

  // Check if the user is on "user-account" or "business-account" page
  const role = "business";

  return (
    <>
      <Navbar expand="md" style={{ backgroundColor: "#FAFAFA" }}>
        <Container fluid>
          <Col xs={2} md={2}>
            <Navbar.Brand className="d-flex align-items-center gap-1">
              <Image fluid src={logo} style={{ maxWidth: "50px" }} />
              <span style={{ color: "#003A70" }} className="fs-6 fw-bold">
                ScraBidder
              </span>
            </Navbar.Brand>
          </Col>
          <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" />
          <Col xs={12} md={8}>
            <Navbar.Collapse className="justify-content-between" id="basic-navbar-nav">
              <Nav className="m-start gap-md-3 text-center">
                <LinkContainer to="/">
                  <Nav.Link className="nav-link text-primary">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/results">
                  <Nav.Link className="nav-link text-primary">Auctions</Nav.Link>
                </LinkContainer>
                <Nav.Link className="nav-link text-primary">Help & Support</Nav.Link>
                <Nav.Link className="nav-link text-primary">About Us</Nav.Link>
              </Nav>

              <div>
                {!isLogedin ? (
                  <LinkContainer to="/login">
                    <Button variant="secondary" className="w-100 text-white">
                      Login/Register
                    </Button>
                  </LinkContainer>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    {/* Notification Icon */}
                    <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="position-relative" id="notifications-dropdown">
                <Bell size={24} color="black" />
                {notifications.length > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {notifications.length}
                  </Badge>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu className="rounded-4" style={{ maxHeight: "500px", overflowY: "auto" }}>
                <Dropdown.Header >Notifications</Dropdown.Header>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <Dropdown.Item key={notification.id} className="d-flex justify-content-between py-3 px-3" >
              <span className="d-flex ">
              <span className="me-4">{notification.icon}</span>
              <span className="d-flex flex-column">
              <span >{notification.message}</span>
              <span className="fw-lighter fst-italic fs-6" style={{color:'#005092'}}><Dot/>10 minutes ago</span>
              </span>
              </span>
              <Dot className="text-end" size={40} style={{color:'#005092'}}/>
            </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled>No new notifications</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

                    {/* Profile Image */}
                    <Nav.Link
                      as="span"
                      onClick={handleShowModal}
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        src={userImage}
                        roundedCircle
                        width={30}
                        height={30}
                        alt="User"
                      />
                    </Nav.Link>

                    <Dropdown align="end" drop="down-start">
                      <Dropdown.Toggle
                        variant="secondary"
                        id="Dropdown-basic"
                        className="border-0 bg-transparent p-0"
                      >
                        {/* Empty Toggle for Dropdown Arrow */}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                   
                       
                        <Dropdown.Item href={role == "business" ? "/business-account" : "/user-account"}>
                              My Account
                            </Dropdown.Item>
                   { role == "business" ?
                        <Dropdown.Item href="/cprofile">
                          My Profile
                        </Dropdown.Item> : null
}
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => setIsLogedin(false)}>
                          Log Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
              </div>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>

      {/* Modal for Enlarged Profile Image */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="text-center">
          <Image
            src={userImage}
            alt="User Enlarged"
            roundedCircle
            fluid
            style={{ maxWidth: "200px", maxHeight: "100" }} // Adjust the size of the enlarged image here
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
