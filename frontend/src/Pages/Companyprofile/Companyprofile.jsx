import React, { useState } from "react";
import { Carousel, Button, Modal } from "react-bootstrap";

function CompanyProfile() {
  // State to check if the user has won the auction
  const [hasWonAuction, setHasWonAuction] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Toggle the modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Header with Company Name and Button on the right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "2em", fontWeight: "lighter" }}>Company Name Here</h2>
        <Button
          style={{
            backgroundColor: "#B87333", // Bronze color for the button
            color: "white", // White text color
            letterSpacing: "2px", // Adds space between letters
            padding: "10px 20px", // Adjust padding for top/bottom and left/right
            borderRadius: "20px", // Rounded corners
            border: "none",
            fontWeight: "lighter", // Lighter font weight
            textTransform: "uppercase",
            marginRight: "30px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#8C4A2E"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#B87333"}
          onClick={handleShowModal}
        >
          Contact Us
        </Button>
      </div>

      {/* Carousel with border */}
      <Carousel interval={1000} style={{ borderRadius: "8px" }}>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://via.placeholder.com/1000x400?text=Company+Image+1"
            alt="First slide"
            style={{
              objectFit: "cover",
              maxHeight: "500px",
              width: "100%",
              borderRadius: "8px",
            }}
          />
          <Carousel.Caption>
            <h3>Company Image 1</h3>
            <p>Description of the first image.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://via.placeholder.com/1000x400?text=Company+Image+2"
            alt="Second slide"
            style={{
              objectFit: "cover",
              maxHeight: "500px",
              width: "100%",
              borderRadius: "8px",
            }}
          />
          <Carousel.Caption>
            <h3>Company Image 2</h3>
            <p>Description of the second image.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://via.placeholder.com/1000x400?text=Company+Image+3"
            alt="Third slide"
            style={{
              objectFit: "cover",
              maxHeight: "500px",
              width: "100%",
              borderRadius: "8px",
            }}
          />
          <Carousel.Caption>
            <h3>Company Image 3</h3>
            <p>Description of the third image.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Flexbox Layout for "Services" and "Company Overview" */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap", // Ensures responsiveness on smaller screens
        }}
      >
        {/* Company Overview Section */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#F3F9FF", // Updated to light blue color
            padding: "40px",
            borderRadius: "8px",
            border: "1px solid #ddd", // Added border
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "1.8em",
              fontWeight: "lighter",
              color: "#003A70",
              marginBottom: "20px",
            }}
          >
            Company Overview
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id
            augue eget enim fermentum luctus. Donec quis nulla id sapien
            fringilla efficitur. Nulla facilisi. Sed nec venenatis odio, sit
            amet placerat urna. Integer in dolor non metus egestas scelerisque
            non sed nisi. Aliquam erat volutpat. Aenean gravida lacinia ante et
            vestibulum.
          </p>
        </div>

        {/* Services Section */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#F3F9FF", // Light blue background
            padding: "40px",
            borderRadius: "8px",
            border: "1px solid #ddd", // Added border
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "1.8em",
              fontWeight: "lighter",
              color: "#003A70",
              marginBottom: "20px",
            }}
          >
            Our Services
          </h3>
          <ul>
            <li>Service 1: High-quality products</li>
            <li>Service 2: Fast and efficient delivery</li>
            <li>Service 3: Excellent customer support</li>
            <li>Service 4: Affordable pricing</li>
            <li>Service 5: Custom solutions</li>
          </ul>
        </div>
      </div>

      {/* Contact Section */}
      <div
        style={{
          marginTop: "50px",
          backgroundColor: "#F3F9FF", // Light blue background for contact section
          padding: "40px",
          borderRadius: "8px",
          border: "1px solid #ddd", // Border added
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Shadow added
        }}
      >
        <h3 style={{ fontSize: "1.8em", fontWeight: "lighter", color: "#003A70", marginBottom: "20px" }}>
          Contact Us
        </h3>

        {/* Contact Details */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
          <div style={{ flex: 1 }}>
            <p><strong>Phone:</strong> +123 456 7890</p>
            <p><strong>Email:</strong> info@company.com</p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Company LinkedIn</a></p>
            <p><strong>Facebook:</strong> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Company Facebook</a></p>
            <p><strong>Location:</strong> 1234 Street Name, City, Country</p>
          </div>

          {/* Google Maps Embed */}
          <div style={{ flex: 1 }}>
            <h4>Our Location</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.7946885046367!2d-122.08503648436325!3d37.42199997982573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb75541c9ffad%3A0x13dcdc3d65e6a755!2sGoogleplex!5e0!3m2!1sen!2sus!4v1670356611934!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: "0", borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Modal for Contact Us */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {hasWonAuction ? (
           <div>
           <p style={{ color: 'green', fontSize: '2em', fontWeight: 'bold', textAlign: 'center' }}>
             Congratulations!
           </p>
           <p>You have won the auction. You can contact us using the following details:</p>
           <p><strong>Eng. Zaina Alrajabi:</strong> +123 456 7890</p>
           <p><strong>Email:</strong> info@company.com</p>
         </div>
         
         
          ) : (
            <div>
              <p>Can Wait to be with you , keep biding</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompanyProfile;
