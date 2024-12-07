import React, { useCallback, useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  InputGroup,
  Container,
  Image,
  Spinner,
} from "react-bootstrap";
import { FaPlus, FaTimes } from "react-icons/fa";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const materialCategories = [
  { id: 1, label: "Iron" },
  { id: 2, label: "Copper" },
  { id: 3, label: "Plastic" },
  { id: 4, label: "Aluminum" },
  { id: 5, label: "Stainless Steel" },
  { id: 6, label: "Wood" },
  { id: 7, label: "Glass" },
  { id: 8, label: "Paper" },
  { id: 9, label: "Rubber" },
  { id: 10, label: "Textile" },
  { id: 11, label: "Ceramic" },
];

function AuctionFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD164boEAkDOWxKojpHFaPRyRyK5sQoPpY", // Replace with your API key
  });

  const handleMapClick = useCallback((event) => {
    setFormData((prev) => ({
      ...prev,
      location: { lat: event.latLng.lat(), lng: event.latLng.lng() },
    }));
  }, []);

  const handleChooseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        () => alert("Could not retrieve your location.")
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  const [formData, setFormData] = useState({
    SellerId: localStorage.getItem("userId"),
    AuctionStatus: "Approved",
    title: "",
    description: "",
    images: [],
    StartingBid: "",
    ReservePrice: "",
    StartingTime: "",
    EndingTime: "",
    Address: "Amman",
    condition: "",
    quantity: "",
    CategoryId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    e.target.value = "";
  };

  const handleImageDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  const convertToUTC = (localDateTime) => {
    const date = new Date(localDateTime); // Local time
    return date.toISOString(); // Convert to ISO string in UTC
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // Convert StartingTime and EndingTime to UTC
    const formDataWithUTC = {
      ...formData,
      StartingTime: convertToUTC(formData.StartingTime),
      EndingTime: convertToUTC(formData.EndingTime),
    };
    for (const [key, value] of Object.entries(formData)) {
      if (key === "images") {
        value.forEach((file) => data.append("images", file));
      } else if (typeof value === "object" && value !== null) {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    }
    for (const [key, value] of data.entries()) {
      console.log(key, value); // This will log each key-value pair in the FormData object
    }
    try {
      const response = await axios.post(
        "http://localhost:5192/api/auction",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting auction:", error);
      alert(error);
    }
  };

  return (
    <Container className="p-0 rounded-4 shadow">
      <h2 className="text-center  rounded-top-4 bg-primary p-4 text-white">
        Create New Auction
      </h2>
      <Form onSubmit={handleSubmit} className="p-4 mx-4 text-primary">
        <Row className="justify-content-center">
          <Row className="g-3">
            <h4 className="text-decoration-underline">Basic Information</h4>
            <Col md={6}>
              <Form.Group controlId="title">
                <Form.Label className="text-light-emphasis">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter the title of the auction"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="CategoryId">
                <Form.Label className="text-light-emphasis">
                  Material Type
                </Form.Label>
                <Form.Select
                  name="CategoryId"
                  value={formData.CategoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Material Type</option>
                  {materialCategories.map((CategoryId) => (
                    <option key={CategoryId.id} value={CategoryId.id}>
                      {CategoryId.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="condition">
                <Form.Label className="text-light-emphasis">
                  Condition
                </Form.Label>
                <Form.Select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option value="">Select Condition</option>
                  <option value="new">new</option>
                  <option value="used">used</option>
                  <option value="mixed">mixed</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="quantity">
                <Form.Label className="text-light-emphasis">
                  Quantity (Kg)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  step={"0.1"}
                  min={1}
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="description">
                <Form.Label className="text-light-emphasis">
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="description"
                  placeholder="Add a description of the item"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-3">
            <h4 className="text-decoration-underline">Pricing</h4>
            <Col md={6}>
              <Form.Group controlId="StartingBid">
                <Form.Label className="text-light-emphasis">
                  Starting Bid
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="text-bg-primary">
                    JD
                  </InputGroup.Text>

                  <Form.Control
                    type="number"
                    name="StartingBid"
                    placeholder="Starting bid amount"
                    value={formData.StartingBid}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="ReservePrice">
                <Form.Label className="text-light-emphasis">
                  Reserve Price
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text className="text-bg-primary">
                    JD
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="ReservePrice"
                    placeholder="Reserve price amount"
                    value={formData.ReservePrice}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-3">
            <h4 className="text-decoration-underline">Timing</h4>
            <Col md={6}>
              <Form.Group controlId="startingTime">
                <Form.Label className="text-light-emphasis">
                  Starting Time
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="StartingTime"
                  value={formData.StartingTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="endingTime">
                <Form.Label className="text-light-emphasis">
                  Ending Time
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="EndingTime"
                  value={formData.EndingTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-3">
            <h4 className="text-decoration-underline">Images</h4>
            <Form.Group controlId="images" className="mb-3">
              <Form.Label className="text-light-emphasis">
                Upload Images
              </Form.Label>
              <Row className="g-3 align-items-center">
                {formData.images.map((image, index) => (
                  <Col xs="auto" key={index} className="position-relative">
                    <div
                      className="border rounded"
                      style={{
                        width: "150px",
                        height: "150px",
                        position: "relative",
                      }}
                    >
                      <Image
                        rounded
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="w-100 h-100 object-fit-cover"
                      />
                      <Button
                        variant="danger"
                        size="sm"
                        className="position-absolute top-0 end-0"
                        onClick={() => handleImageDelete(index)}
                      >
                        <FaTimes />
                      </Button>
                    </div>
                  </Col>
                ))}
                <Col xs="auto">
                  <label
                    className="d-flex flex-column justify-content-center align-items-center border border-secondary rounded p-1 text-secondary"
                    style={{
                      width: "150px",
                      height: "150px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="d-none"
                    />
                    <FaPlus size={24} />
                  </label>
                </Col>
              </Row>
            </Form.Group>
          </Row>
          <Row className="g-3">
            <h4 className="text-decoration-underline">Location</h4>
            <Col>
              <Button variant="secondary" className="text-white">
                Current Location
              </Button>
            </Col>
            {/*<Col xs={12} className="">
              {isLoaded ? (
                <GoogleMap
                  center={
                    formData.location.lat
                      ? formData.location
                      : "Amman"
                  }
                  zoom={18}
                  mapContainerStyle={{ height: "400px", width: "100%" }}
                  
                >
                  {formData.location.lat && (
                    <Marker position={formData.location} />
                  )}
                </GoogleMap>
              ) : (
                <Spinner animation="border"></Spinner>
              )}
            </Col>*/}
          </Row>

          <Col
            xs={12}
            sm={6}
            md={4}
            className=" d-flex mt-3 justify-content-center"
          >
            <Button
              variant="primary"
              type="submit"
              className="w-100 text-white"
            >
              Submit
            </Button>
          </Col>
          {submitted && (
            <div className="alert alert-success mt-5" role="alert">
              Auction Form Submitted Successfully !
            </div>
          )}
        </Row>
      </Form>
    </Container>
  );
}

export default AuctionFormPage;
