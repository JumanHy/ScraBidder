import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus, FaTimes } from "react-icons/fa";
import { Modal, Button, Form, Row, Col, Image, Spinner } from "react-bootstrap";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const UserDetails = () => {
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState({
    primaryContactFirstName: "",
    primaryContactLastName: "",
    primaryContactEmail: "",
    primaryPhoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEditingServiceInfo, setIsEditingServiceInfo] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const response = await axios.get(
        "http://localhost:5192/api/UserSetting/business-primary-info",
        {
          params: { userId },
        }
      );

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

  const [companyServiceInfo, setCompanyServiceInfo] = useState({
    companyName: "Company ABC",
    serviceDetails: "Basic service details here...",
  });
  const [formData, setFormData] = useState({
    images: [],
  });

  const [imageData, setImageData] = useState([]);
  const [fetchedImages, setFetchedImages] = useState([]);

  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };
  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found in localStorage.");

      const updatedUserInfo = { ...userInfo, userId };

      const response = await axios.put(
        "http://localhost:5192/api/UserSetting/update-business-primary-info",
        updatedUserInfo
      );

      if (response.status >= 200 && response.status < 300) {
        alert("User details updated successfully!");
        toggleEditUserInfo();
        fetchUserDetails();
      } else {
        alert(`Failed to update user details. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      alert(`An error occurred while updating user details: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEditUserInfo = () => {
    setIsEditingUserInfo((prev) => !prev);
  };

  const toggleEditServiceInfo = () =>
    setIsEditingServiceInfo(!isEditingServiceInfo);
  const handleServiceInputChange = (event) => {
    const { value } = event.target;
    setCompanyServiceInfo((prevInfo) => ({
      ...prevInfo,
      serviceDetails: value,
    }));
  };

  const fetchUserImages = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found in localStorage.");

      const response = await axios.get(
        `http://localhost:5192/api/UserSetting/get-images/${userId}`
      );
      setImageData(response.data.images);

      if (response.data && response.data.images) {
        setFetchedImages(response.data.images);
      }
    } catch (error) {
      console.error("Error fetching user images:", error);
      alert("Failed to fetch images.");
    }
  };

  useEffect(() => {
    fetchUserImages();
  }, []);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);

    // Limit the number of images
    if (formData.images.length + files.length > 3) {
      alert("You can only upload up to three images.");
      return;
    }

    const formDataToSend = new FormData();
    files.forEach((file) => {
      formDataToSend.append("images", file);
    });

    try {
      // Get userId from localStorage
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      // Send the request to backend with userId in the URL path
      const response = await axios.post(
        `http://localhost:5192/api/UserSetting/upload-images/${userId}`, // Correct URL format
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct header for file uploads
          },
        }
      );

      fetchUserImages();

      // If the upload is successful, update the state with the uploaded images
      if (response.status >= 200 && response.status < 300) {
        // Assuming the response contains the uploaded images info, update state
        setFormData((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...files], // Add new images to state
        }));
        alert("Images uploaded successfully!");
      } else {
        alert("Failed to upload images.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert(`An error occurred while uploading images: ${error.message}`);
    }
  };
  const handleImageDelete = async (imageId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found in localStorage.");
      console.log({ userId }, { imageId });
      const response = await axios.delete(
        `http://localhost:5192/api/UserSetting/delete-image/${userId}/${imageId}`
      );
      fetchUserImages();



      if (response.status >= 200 && response.status < 300) {
        setFetchedImages((prevImages) =>
          prevImages.filter((image) => image !== imageId)
        );
        alert("Image deleted successfully!");
      } else {
        alert("Failed to delete the image.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert(`An error occurred while deleting the image: ${error.message}`);
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
            <strong>FirstName:</strong> {userInfo.primaryContactFirstName}
          </p>
          <p style={{ color: "black", fontSize: "14px" }}>
            <strong>LastName:</strong> {userInfo.primaryContactLastName}
          </p>
          <p style={{ color: "black", fontSize: "14px" }}>
            <strong>Email:</strong> {userInfo.primaryContactEmail}
          </p>
          <p style={{ color: "black", fontSize: "14px" }}>
            <strong>Phone:</strong> {userInfo.primaryPhoneNumber}
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
          <h3>Company Service </h3>
          <p style={{ color: "black", fontSize: "16px" }}>
            <strong>Company Name:</strong>{" "}
            <span style={{ color: "black", fontSize: "14px" }}>
              {companyServiceInfo.companyName}
            </span>
          </p>
          <p style={{ color: "black", fontSize: "16px" }}>
            <strong>Service Details:</strong>{" "}
            <span style={{ color: "black", fontSize: "14px" }}>
              {companyServiceInfo.serviceDetails}
            </span>
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={toggleEditServiceInfo}
            style={{ position: "absolute", bottom: "20px", right: "20px" }}
          >
            <FaEdit /> Edit
          </button>

          {/* Modal for Editing Service Info */}
          <Modal
            show={isEditingServiceInfo}
            onHide={toggleEditServiceInfo}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Service Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    value={companyServiceInfo.companyName}
                    onChange={handleServiceInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Service Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="serviceDetails"
                    value={companyServiceInfo.serviceDetails}
                    onChange={handleServiceInputChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleEditServiceInfo}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsEditingServiceInfo(false);
                }}
              >
                Save changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* Similar modal for editing service info */}
      </div>

      {/* Image Upload Section */}
      <div
        style={{
          padding: "20px",
          borderRadius: "5px",
          border: "2px solid #ddd",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3>Images</h3>
        <p>Add up to three images for your company profile.</p>
        <Row className="g-3 mt-3">
          {formData.images.map((image, index) => (
            <Col xs="auto" key={index} className="position-relative">
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  position: "relative",
                }}
              >
                <Image
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  fluid
                  rounded
                />
              </div>
            </Col>
          ))}
          <Col xs="auto">
            <label style={{ cursor: "pointer" }}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="d-none"
              />
              <div
                className="d-flex align-items-center justify-content-center border rounded"
                style={{
                  width: "150px",
                  height: "150px",
                  backgroundColor: "#f8f9fa",
                  color: "#6c757d",
                  fontSize: "24px",
                }}
              >
                <FaPlus />
              </div>
            </label>
          </Col>
        </Row>
      </div>

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
          {/* User Info and Company Info (Same as before) */}
        </div>

        <div
          style={{
            padding: "20px",
            borderRadius: "8px",
            border: "2px solid #ddd",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            marginTop: "20px",
          }}
        >
          <h3>Uploaded Images</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "flex-start",
            }}
          >
            {fetchedImages && fetchedImages.length > 0 ? (
              fetchedImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    width: "150px",
                    height: "150px",
                    backgroundColor: "#f1f1f1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Image
                    src={`data:image/png;base64,${image.base64}`}
                    fluid
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleImageDelete(image.id)}
                    className="position-absolute top-0 end-0"
                  >
                    <FaTimes />
                  </Button>
                </div>
              ))
            ) : (
              <p>No images uploaded yet.</p>
            )}
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
                  formData.location && formData.location.lat
                    ? formData.location
                    : { lat: 31.963158, lng: 35.930359 }
                }
                zoom={18}
                mapContainerStyle={{ height: "400px", width: "100%" }}
                onClick={handleMapClick}
              >
                {formData.location && formData.location.lat && (
                  <Marker position={formData.location} />
                )}
              </GoogleMap>
            ) : (
              <Spinner animation="border" />
            )}
          </Col>
        </Row>

        <Col
          xs={12}
          sm={6}
          md={4}
          className="d-flex mt-3 justify-content-center"
        >
          <Button
            variant="primary"
            type="submit"
            className="w-75 rounded text-white"
          >
            Submit
          </Button>
        </Col>
      </div>
    </div>
  );
};

export default UserDetails;




