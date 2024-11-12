import { Container, Col, Button, Image, Badge, Dropdown, Modal } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "@/assets/images/ScraBidderLogo.png";
import { LinkContainer } from "react-router-bootstrap";
import "./style.css";
import { FaBell } from "react-icons/fa";
import userImage from "@/assets/images/UserImage.png";
import { useState } from "react";

function NavBar() {
  const [isLogedin, setIsLogedin] = useState(false);

  // State for controlling the profile image modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to open modal
  const handleShowModal = () => setShowModal(true);
  
  // Function to close modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Navbar expand="md" style={{ backgroundColor: "#FAFAFA" }}>
        <Container fluid>
          <Col xs={2} md={2} className="">
            <Navbar.Brand className="d-flex align-items-center gap-1">
              <Image fluid src={logo} style={{ maxWidth: "50px" }} />
              <span style={{ color: "#003A70" }} className="fs-6 fw-bold">
                ScraBidder
              </span>
            </Navbar.Brand>
          </Col>
          <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" />
          <Col xs={12} md={8}>
            <Navbar.Collapse
              className="justify-content-between"
              id="basic-navbar-nav"
            >
              <Nav className="m-start gap-md-3 text-center">
                <LinkContainer to="/">
                  <Nav.Link className="nav-link text-primary">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/results">
                  <Nav.Link className="nav-link text-primary">Auctions</Nav.Link>
                </LinkContainer>
                <Nav.Link className="nav-link text-primary">
                  Help & Support
                </Nav.Link>
                <Nav.Link className="nav-link text-primary">About Us</Nav.Link>
              </Nav>

              <div>
                {!isLogedin ? (
                  <LinkContainer to="/login">
                    <Button variant="secondary" className="w-100 text-white">
                      Login\Register
                    </Button>
                  </LinkContainer>
                ) : (
                  <div className="d-flex align-items-center gap-2">
                    {/* Notification Icon */}
                    <Nav.Link className="position-relative">
                      <FaBell size={20} />
                      <Badge
                        bg="danger"
                        pill
                        className="position-absolute top-0 start-100 translate-middle p-1"
                      >
                        5
                      </Badge>
                    </Nav.Link>

                    {/* Profile Image */}
                    <Nav.Link as="span" onClick={handleShowModal} style={{ cursor: 'pointer' }}>
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
                        <Dropdown.Item href="/business-account">My Account</Dropdown.Item>
                        <Dropdown.Item href="/cprofile">My Profile</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="/">Log Out</Dropdown.Item>
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
        <Modal.Body className="text-center"
        
        >
          <Image
            src={userImage}
            alt="User Enlarged"
            roundedCircle
            fluid
            style={{ maxWidth: "200px",  maxHeight:"100" }} // Adjust the size of the enlarged image here
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavBar;
