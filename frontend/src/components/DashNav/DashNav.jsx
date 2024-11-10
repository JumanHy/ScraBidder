import { Container, Image, Nav, Navbar, Dropdown, Badge } from "react-bootstrap";
import logo from "../../assets/images/ScraBidderLogo.png";
import React from "react";
import { Gear, Bell, Person } from "react-bootstrap-icons"; // Import Person icon for profile
import "./style.css";

function NavBar() {
  const notifications = [
    { id: 1, message: "New comment on your post" },
    { id: 2, message: "You have a new follower" },
    { id: 3, message: "Update your profile information" },
  ];

  return (
    <Navbar expand="md" style={{ backgroundColor: "#FAFAFA" }}>
      <Container fluid>
        {/* Left Column: Logo */}
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-1" style={{ flex: '1' }}>
          <Image fluid src={logo} style={{ maxWidth: "50px" }} />
          <span style={{ color: "#003A70" }} className="fs-6 fw-bold">
            ScraBidder
          </span>
        </Navbar.Brand>

        {/* Right Column: Nav items */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-md-3 text-center align-items-center"> {/* Align items to end */}
            <Nav.Link className="nav-link fw-bold" style={{ color: "#9F1717" }} href=".AboutUs/">
              Log out
            </Nav.Link>

            {/* Settings Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="link" id="settings-dropdown" className="settings-dropdown-toggle">
                <Gear size={24} color="black" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Account Settings</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Help</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-4">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Notifications Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="position-relative" id="notifications-dropdown">
                <Bell size={24} color="black" />
                {notifications.length > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {notifications.length}
                  </Badge>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>Notifications</Dropdown.Header>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <Dropdown.Item key={notification.id}>{notification.message}</Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled>No new notifications</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>

            {/* Admin Name with Profile Icon as Link */}
            <Nav.Link className="d-flex align-items-center" href="#profile">
              <h5 className="mb-0 me-2">Admin Name</h5>
              <Person size={24} color="black" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
