import { Container, Col, Button, Image } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "@/assets/images/ScraBidderLogo.png";
import { LinkContainer } from "react-router-bootstrap";
import "./style.css";
function NavBar() {
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid>
        <Col xs={2} md={2} className="">
          <Navbar.Brand className="d-flex align-items-center gap-1">
            <Image fluid src={logo} style={{ maxWidth: "50px" }} />
            <span className="fs-6 fw-bold text-primary">ScraBidder</span>
          </Navbar.Brand>
        </Col>
        <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" />
        <Col xs={12} md={8}>
          <Navbar.Collapse
            className="justify-content-between"
            id="basic-navbar-nav"
          >
            <Nav className="m-start gap-md-3 text-center">
              <Nav.Link className="nav-link text-primary">Home</Nav.Link>
              <LinkContainer to="/results">
                <Nav.Link className="nav-link text-primary">Auctions</Nav.Link>
              </LinkContainer>
              <Nav.Link className="nav-link text-primary">
                Help & Support
              </Nav.Link>
              <Nav.Link className="nav-link text-primary">About Us</Nav.Link>
            </Nav>
            <div>
              <Button className="btn-secondary text-white w-100">
                Login\Register
              </Button>
            </div>
          </Navbar.Collapse>
        </Col>
      </Container>
    </Navbar>
  );
}

export default NavBar;
