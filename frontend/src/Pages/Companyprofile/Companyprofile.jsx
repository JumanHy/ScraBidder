import React, { useState, useEffect } from "react";
import { Carousel, Button, Modal } from "react-bootstrap";
import axios from "axios";

function CompanyProfile() {
  // State to check if the user has won the auction
  const [hasWonAuction, setHasWonAuction] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [companyServiceInfo, setCompanyServiceInfo] = useState("");
  const [CompanyVision, setCompanyVision] = useState("");

  // Toggle the modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Fetch images from API
  const fetchUserImages = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found in localStorage.");

      const response = await axios.get(
        `http://localhost:5192/api/UserSetting/get-images/${userId}`
      );
      setFetchedImages(response.data.images);
    } catch (error) {
      console.error("Error fetching user images:", error);
      alert("Failed to fetch images.");
    }
  };

  const fetchCompanyInfo = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      const companyNameResponse = await axios.get(
        `http://localhost:5192/api/UserSetting/company-name?userId=${userId}`
      );
      setBusinessName(
        companyNameResponse.data.businessName || "Company Name Not Found"
      );

      const servicesResponse = await axios.get(
        `http://localhost:5192/api/UserSetting/company-service/${userId}`
      );
      setCompanyServiceInfo(
        servicesResponse.data.businessServices || "No services available"
      );

      const visionResponse = await axios.get(
        `http://localhost:5192/api/UserSetting/vision/${userId}`
      );

      setCompanyVision(visionResponse.data || "Vision not available");
    } catch (error) {
      console.error("Error fetching company information:", error);
      alert("Failed to fetch company info.");
    }
  };

  useEffect(() => {
    fetchUserImages();
    fetchCompanyInfo();
  }, []);

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
        <h2 style={{ fontSize: "2em", fontWeight: "lighter" }}>
          {businessName || "Loading Company Name..."}
        </h2>
        <Button
          style={{
            backgroundColor: "#B87333",
            color: "white",
            letterSpacing: "2px",
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            fontWeight: "lighter",
            textTransform: "uppercase",
            marginRight: "30px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#8C4A2E")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#B87333")}
          onClick={handleShowModal}
        >
          Contact To Deliver
        </Button>
      </div>

      {/* Carousel with fetched images */}
      <Carousel interval={1000} style={{ borderRadius: "8px" }}>
        {fetchedImages && fetchedImages.length > 0 ? (
          fetchedImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 img-fluid"
                src={`data:image/png;base64,${image.base64}`}
                alt={`Company Image ${index + 1}`}
                style={{
                  objectFit: "cover",
                  maxHeight: "500px",
                  width: "100%",
                  borderRadius: "8px",
                }}
              />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <img
              className="d-block w-100 img-fluid"
              src="https://via.placeholder.com/1000x400?text=No+Images+Available"
              alt="No images"
              style={{
                objectFit: "cover",
                maxHeight: "500px",
                width: "100%",
                borderRadius: "8px",
              }}
            />
            <Carousel.Caption>
              <h3>No Images Available</h3>
              <p>We currently don't have any images to display.</p>
            </Carousel.Caption>
          </Carousel.Item>
        )}
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
          <p>{CompanyVision}</p>
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
          <p>{companyServiceInfo}</p>
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
        <h3
          style={{
            fontSize: "1.8em",
            fontWeight: "lighter",
            color: "#003A70",
            marginBottom: "20px",
          }}
        >
          Contact Us
        </h3>

        {/* Contact Details */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div style={{ flex: 1 }}>
            <p>
              <strong>Phone:</strong> +123 456 7890
            </p>
            <p>
              <strong>Email:</strong> info@company.com
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Company LinkedIn
              </a>
            </p>
          </div>

          {/* Google Maps Embed */}
          <div style={{ flex: 1 }}>
            <h4>Our Location</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.7946885046367!2d-122.08503648436325!3d37.42199997982573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb508fd23b7eb%3A0x290c23fc1b05a2ff!2sGoogleplex!5e0!3m2!1sen!2sus!4v1618903508658!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: "0", borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {hasWonAuction ? (
            <div>
              <p
                style={{
                  color: "green",
                  fontSize: "2em",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Congratulations!
              </p>
              <p>
                You have won the auction. You can contact us using the following
                details:
              </p>
              <p>
                <strong>Eng. Zaina Alrajabi:</strong> +123 456 7890
              </p>
              <p>
                <strong>Email:</strong> info@company.com
              </p>
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
