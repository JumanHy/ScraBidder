import { FaEdit } from "react-icons/fa";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Swal from "sweetalert2";
const UserDetails = () => {
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [formData, setFormData] = useState({
    location: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  // Fetch User Details from the API
  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found in localStorage.");

      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const response = await axios.get(
        `http://localhost:5192/api/IndividualAccount/userdetails`,
        {
          params: { userId },
        }
      );

      setUserInfo(response.data);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user details:", error);
      Swal.fire("Error", "Failed to fetch user details.", "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Handle Save Changes
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
        Swal.fire({
          icon: "success",
          title: "User Details Updated",
          text: "User details updated successfully!",
        });
        toggleEditUserInfo();
        fetchUserDetails();
      } else {
        Swal.fire(
          "Error",
          "Failed to update user details. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      Swal.fire(
        "Error",
        "An error occurred while updating user details.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Submit updated location to the backend
  const handleSubmitLocation = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found in localStorage.");
      const locationDto = {
        longitude: formData.location.lng,
        latitude: formData.location.lat,
        address: "",
      };
      if (!locationDto)
        return Swal.fire({
          title: "Location is not selected",
          text: "Please select or choose a location before submitting.",
          icon: "warning",
        });

      const response = await axios.patch(
        `http://localhost:5192/api/IndividualAccount/upload-location/${userId}`,
        locationDto
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Sucessful",
          text: "Location updated successfully!",
          icon: "success",
        });

        fetchUserDetails(); // Refresh user details
      } else {
      }
    } catch (error) {
      console.error("Error updating location:", error);
    }
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
          setIsLocationLoading(false);
        }
      );
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

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // Toggle Edit Mode
  const toggleEditUserInfo = () => {
    setIsEditingUserInfo(!isEditingUserInfo);
  };

  // Handle Image Upload
  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();

    for (const file of files) {
      formData.append("images", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:5192/api/Image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Image Uploaded",
          text: "Your image(s) have been uploaded successfully!",
        });
      } else {
        Swal.fire(
          "Error",
          "Failed to upload images. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      Swal.fire("Error", "An error occurred while uploading images.", "error");
    }
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD164boEAkDOWxKojpHFaPRyRyK5sQoPpY",
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
                {Object.keys(userInfo).map(
                  (key) =>
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
                )}
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
              center={
                formData.location
                  ? {
                      lat: formData.location.lat,
                      lng: formData.location.lng,
                    }
                  : { lat: 31.963158, lng: 35.930359 }
              }
              zoom={18}
              mapContainerStyle={{ height: "400px", width: "100%" }}
              onClick={handleMapClick}
            >
              {formData.location && (
                <Marker
                  position={{
                    lat: formData.location.lat,
                    lng: formData.location.lng,
                  }}
                />
              )}
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
          onClick={handleSubmitLocation}
        >
          Submit Location
        </Button>
      </Col>
    </div>
  );
};

export default UserDetails;
