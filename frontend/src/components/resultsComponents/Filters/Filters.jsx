import React, { useState } from "react";
import { Form, Container, Row, Col, Button, Stack } from "react-bootstrap";

function Filters() {
  const [filters, setFilters] = useState({
    materialType: "",
    condition: "",
    quantity: "",
    auctionStatus: "",
  });

  // Handle change for each input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Form className=" shadow-lg rounded" style={{ backgroundColor: "#f8f9fa" }}>
      <Container fluid className="p-0 rounded">
        <Col xs={12}>
          <h5 className="text-white p-3 bg-primary text-center">Filters</h5>
        </Col>
        {/* Material Type (Radio Buttons) */}
        <Form.Group as={Row} className=" mb-3 p-3 align-items-center">
          <Form.Label column xs={12} sm={4} className="text-secondary">
            Material Type
          </Form.Label>
          <Col sm={8}>
            <Form.Select
              name="materialType"
              value={filters.materialType}
              onChange={handleChange}
              className="rounded"
            >
              <option value="">Select material type</option>
              {[
                "Aluminum",
                "Copper",
                "Plastic",
                "Iron",
                "Stainless Steel",
                "Wood",
                "Glass",
                "Paper",
                "Rubber",
                "Textile",
                "Ceramic",
              ].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Condition (Dropdown Select) */}
        <Form.Group as={Row} className="mb-3 p-3">
          <Form.Label column xs={12} sm={4} className="text-secondary">
            Condition
          </Form.Label>
          <Col sm={8}>
            <Form.Select
              name="condition"
              value={filters.condition}
              onChange={handleChange}
              className="rounded"
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="mixed">Mixed</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Quantity (Number Input) */}
        <Form.Group as={Row} className="mb-3 p-3">
          <Form.Label column sm={4} className="text-secondary">
            Quantity
          </Form.Label>
          <Col xs={12} sm={8} className="">
            <Stack
              direction="horizontal"
              className="align-items-center justify-content-center gap-2"
            >
              <Form.Control
                type="number"
                name="quantity"
                value={filters.quantity}
                onChange={handleChange}
                min="0"
                className="rounded"
              />
              <div className="text-primary fw-bold">Tons</div>
            </Stack>
          </Col>
        </Form.Group>

        {/* Auction Status */}
        <Form.Group as={Row} className="mb-4 p-3">
          <Form.Label as="legend" column sm={4} className="text-secondary">
            Auction Status
          </Form.Label>
          <Col xs={12} sm={8}>
            {["All", "Closed", "Started", "Not Started"].map((status) => (
              <Form.Check
                type="radio"
                label={status}
                name="auctionStatus"
                value={status}
                checked={filters.auctionStatus === status}
                onChange={handleChange}
                key={status}
                className="text-secondary"
              />
            ))}
          </Col>
        </Form.Group>

        {/* Submit Button */}
        <div className="d-flex justify-content-center p-3">
          <Button
            variant="primary"
            className="text-uppercase rounded-pill w-100 fw-bold "
            onClick={() => console.log(filters)}
          >
            Submit
          </Button>
        </div>
      </Container>
    </Form>
  );
}

export default Filters;
