import { Container, Image, Nav, Navbar, Dropdown } from "react-bootstrap";
import logo from "../../assets/images/ScraBidderLogo.png";
import React, { useState } from "react";
import { Gear, Person, BoxArrowRight } from "react-bootstrap-icons"; // Import Person icon for profile
import "./style.css";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    navigate("/login");
  };

  if (
    localStorage.getItem("role") == null ||
    localStorage.getItem("role") != "Admin"
  ) {
    navigate("/login");
  }
  return (
    <Navbar expand="md" style={{ backgroundColor: "#FAFAFA" }} fixed="top">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand
            className="d-flex align-items-center gap-1"
            style={{ flex: "1" }}
          >
            <Image fluid src={logo} style={{ maxWidth: "50px" }} />
            <span style={{ color: "#003A70" }} className="fs-6 fw-bold">
              ScraBidder
            </span>
          </Navbar.Brand>
        </LinkContainer>
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
                <Dropdown.Item
                  className="text-danger fw-bold"
                  onClick={handleLogout}
                >
                  Logout <BoxArrowRight size={15} className="me-2 ms-2" />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav
              className="dashnav-link d-flex align-items-center"
              href="#profile"
            >
              <h5 className="mb-0 me-2">Admin</h5>
              <Person size={24} color="black" />
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
