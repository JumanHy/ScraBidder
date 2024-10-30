import { Container, Col, Button, Image, Stack } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/images/ScraBidderLogo.png";
import "./style.css";
function NavBar() {
  return (
    <Navbar expand="md" style={{ backgroundColor: "#FAFAFA" }}>
      <Container fluid>
        <Col xs={12} md={2} className="">
          <Navbar.Brand
            href="#home"
            className="d-flex align-items-center justify-content-center justify-content-md-start gap-1"
          >
            <Image fluid src={logo} style={{ maxWidth: "50px" }} />
            <span style={{ color: "#003A70" }} className="fs-6 fw-bold">
              ScraBidder
            </span>
          </Navbar.Brand>
        </Col>
        <Col xs={12} md={8} className="">
          <Navbar.Toggle className="col-12" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-between"
            id="basic-navbar-nav"
          >
            <Nav className="m-start gap-md-3 text-center">
              <Nav.Link
                className="nav-link "
                style={{ color: "#003A70" }}
                href="#home"
              >
                Home
              </Nav.Link>
              <Nav.Link
                className="nav-link "
                style={{ color: "#003A70" }}
                href="#link"
              >
                Auctions
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                style={{ color: "#003A70" }}
                href="#link"
              >
                Help & Support
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                style={{ color: "#003A70" }}
                href="#link"
              >
                About Us
              </Nav.Link>
            </Nav>
            <div>
              <Button
                style={{ backgroundColor: "#B87333" }}
                className="border-0 login-btn w-100"
              >
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