import { FaEdit } from "react-icons/fa";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import React, { useState, useEffect } from "react";

const UserDetails = () => {
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [formData, setFormData] = useState({
    images: [],
    location: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const response = await axios.get(`http://localhost:5192/api/IndividualAccount/userdetails`, {
        params: { userId },
      });

      setUserInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Failed to fetch user details.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found in localStorage.");

 
      const updatedUserInfo = { ...userInfo, userId };

      const response = await axios.put(
        "http://localhost:5192/api/IndividualAccount/update-user-details",
        updatedUserInfo
      );

      if (response.status === 200) {
        alert("User details updated successfully!");
        toggleEditUserInfo();
        fetchUserDetails();
      } else {
        alert("Failed to update user details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("An error occurred while updating user details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const toggleEditUserInfo = () => {
    setIsEditingUserInfo(!isEditingUserInfo);
  };

  const handleChooseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
          setIsLocationLoading(false);
        },
        () => {
          alert("Failed to retrieve location");
          setIsLocationLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleMapClick = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      location: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    }));
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
        fontFamily: "Lato, sans-serif",
      }}
    >
      {/* User Info Section */}
      <div style={{ display: "flex", gap: "20px" }}>
        <div
          style={{
            flex: 1,
            padding: "20px",
            borderRadius: "5px",
            border: "2px solid #ddd",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            position: "relative",
          }}
        >
          <h3>User Details</h3>
          <p style={{ color: "black", fontSize: "14px" }}>
            <strong>First Name:</strong> {userInfo.firstName}
          </p>
          <p style={{ color: "black", fontSize: "14px" }}>
            <strong>Last Name:</strong> {userInfo.lastName}
          </p>
          <p style={{ color: "black", fontSize: "14px" }}>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p style={{ color: "black", fontSize: "14px" }}>
            <strong>Phone:</strong> {userInfo.phoneNumber}
          </p>

          <button
            className="btn btn-primary btn-sm"
            onClick={toggleEditUserInfo}
            style={{ position: "absolute", bottom: "20px", right: "20px" }}
          >
            <FaEdit /> Edit
          </button>

          {/* Modal for Editing User Info */}
          <Modal show={isEditingUserInfo} onHide={toggleEditUserInfo} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit User Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {Object.keys(userInfo).map((key) => (
                  key !== "userId" && (
                    <Form.Group key={key} className="mb-3">
                      <Form.Label>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name={key}
                        value={userInfo[key]}
                        onChange={handleUserInputChange}
                      />
                    </Form.Group>
                  )
                ))}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleEditUserInfo}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Save changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

      {/* Location Section */}
      <Row className="g-3">
        <h4 className="text-decoration-underline">Location</h4>
        <Col>
          <Button
            variant="secondary"
            className="text-white"
            onClick={handleChooseCurrentLocation}
            disabled={isLocationLoading}
          >
            {isLocationLoading ? "Locating..." : "Current Location"}
          </Button>
        </Col>
        <Col xs={12}>
          {isLoaded ? (
            <GoogleMap
              center={formData.location ? formData.location : { lat: 31.963158, lng: 35.930359 }}
              zoom={18}
              mapContainerStyle={{ height: "400px", width: "100%" }}
              onClick={handleMapClick}
            >
              {formData.location && <Marker position={formData.location} />}
            </GoogleMap>
          ) : (
            <Spinner animation="border" />
          )}
        </Col>
      </Row>

      <Col xs={12} sm={6} md={4} className="d-flex mt-3 justify-content-center">
        <Button
          variant="primary"
          className="w-75 rounded text-white"
          onClick={() => {}}
        >
          Submit
        </Button>
      </Col>
    </div>
  );
};

export default UserDetails;
