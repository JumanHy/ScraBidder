import { Container, Col, Button, Image, Badge } from "react-bootstrap";
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
  return (
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
                  {/* Logout Button */}
                  <Nav.Link href="/logout" className="logout-link ms-2">
                    Logout
                  </Nav.Link>

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

                  <Nav.Link href="/profile">
                    <Image
                      src={userImage}
                      roundedCircle
                      width={30}
                      height={30}
                      alt="User"
                    />
                  </Nav.Link>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Col>
      </Container>
    </Navbar>
  );
}

export default NavBar;
