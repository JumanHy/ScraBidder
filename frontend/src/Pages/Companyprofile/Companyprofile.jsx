import React, { useState, useEffect } from "react";
import { Carousel, Button, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

function CompanyProfile() {
  const { sellerId } = useParams(); // Get auctionId from URL
  const [loading, setLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(false);
  const [fetchedImages, setFetchedImages] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [companyServiceInfo, setCompanyServiceInfo] = useState("");
  const [companyVision, setCompanyVision] = useState("");
  const [contactInfo, setContactInfo] = useState({
    primaryContactFirstName: "",
    primaryContactLastName: "",
    primaryContactEmail: "",
    primaryPhoneNumber: " ",
  });
  const [businessContactInfo, setBusinessContactInfo] = useState({});

  const handleShowModal = () => {
    fetchContactInfo();
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const fetchContactInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5192/api/UserSetting/business-primary-info?userId=${sellerId}`
      );

      setContactInfo({
        primaryContactFirstName:
          response.data.primaryContactFirstName || "First Name",
        primaryContactLastName:
          response.data.primaryContactLastName || "Last Name",
        primaryContactEmail:
          response.data.primaryContactEmail || "Email Not Available",
        primaryPhoneNumber:
          response.data.primaryPhoneNumber || "Phone Number Not Available",
      });
    } catch (error) {
      console.error("Error fetching contact information:", error);
    }
  };

  const fetchBusinessContactInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5192/api/UserSetting/contacts/${sellerId}`
      );
      setBusinessContactInfo(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching business contact information:", error);
    }
  };

  const fetchUserImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5192/api/UserSetting/get-images/${sellerId}`
      );
      setFetchedImages(response.data.images);
    } catch (error) {
      console.error("Error fetching user images:", error);
    }
  };

  const fetchCompanyInfo = async () => {
    try {
      const companyNameResponse = await axios.get(
        `http://localhost:5192/api/UserSetting/company-name?userId=${sellerId}`
      );
      setBusinessName(
        companyNameResponse.data.businessName || "Company Name Not Found"
      );

      const servicesResponse = await axios.get(
        `http://localhost:5192/api/UserSetting/company-service/${sellerId}`
      );
      setCompanyServiceInfo(
        servicesResponse.data.businessServices || "No services available"
      );

      const visionResponse = await axios.get(
        `http://localhost:5192/api/UserSetting/vision/${sellerId}`
      );
      setCompanyVision(visionResponse.data || "Vision not available");
    } catch (error) {
      console.error("Error fetching company information:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchUserImages(),
          fetchCompanyInfo(),
          fetchBusinessContactInfo(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
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
          <p>{companyVision}</p>
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
              <strong>Phone:</strong> {businessContactInfo.businessPhoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {businessContactInfo.businessEmail}
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={businessContactInfo.linkedIn || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {businessContactInfo.linkedIn
                  ? "Company LinkedIn"
                  : "Company LinkedIn"}
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
          <Modal.Title>Business Contact Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>
              <strong>Contact Name: </strong>
              <strong>
                {contactInfo.primaryContactFirstName}{" "}
                {contactInfo.primaryContactLastName}
              </strong>
            </p>
            <p>
              <strong>Email: </strong>
              {contactInfo.primaryContactEmail}
            </p>
            <p>
              <strong>Phone: </strong>
              {contactInfo.primaryPhoneNumber}
            </p>
          </div>
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
