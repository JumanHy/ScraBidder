import { Container, Col, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  return (
    // <div className="">
    //   <div className="col-2">
    //     <img src="" alt="logo" />
    //   </div>
    //   <div className="col-2">

    //   </div>
    // </div>
    <Navbar expand="md" style={{ backgroundColor: "#FAFAFA" }}>
      <Container fluid className="">
        <Col sm={4} md={1}>
          <Navbar.Brand href="#home">ScraBidder</Navbar.Brand>
        </Col>
        <Col sm={"auto"} md={11} className="">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link style={{ color: "#003A70" }} href="#home">
                Home
              </Nav.Link>
              <Nav.Link style={{ color: "#003A70" }} href="#link">
                Auctions
              </Nav.Link>
              <Nav.Link style={{ color: "#003A70" }} href="#link">
                Help & Support
              </Nav.Link>
              <Nav.Link style={{ color: "#003A70" }} href="#link">
                About Us
              </Nav.Link>
            </Nav>
            <Button style={{ backgroundColor: "#B87333" }} className="border-0">
              Login\Register
            </Button>
          </Navbar.Collapse>
        </Col>
      </Container>
    </Navbar>
  );
}

export default NavBar;
