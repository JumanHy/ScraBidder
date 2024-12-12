import React, { useState } from "react";
import { Form, Container, Row, Col, Button, Stack } from "react-bootstrap";

function Filters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    materialType: "",
    condition: "",
    quantity: "",
    auctionStatus: "",
  });

  const materialTypeMapping = {
    Aluminum: 1,
    Copper: 2,
    Plastic: 3,
    Iron: 4,
    "Stainless Steel": 5,
    Wood: 6,
    Glass: 7,
    Paper: 8,
    Rubber: 9,
    Textile: 10,
    Ceramic: 11,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters); // Update local state
    onFilterChange(updatedFilters); // Send updated filters to parent
  };

  return (
    <Form className="shadow-lg rounded" style={{ backgroundColor: "#f8f9fa" }}>
      <Container fluid className="p-0 rounded">
        <Col xs={12}>
          <h5 className="text-white p-3 bg-primary text-center">Filters</h5>
        </Col>
        <Form.Group as={Row} className="mb-3 p-3 align-items-center">
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
              {Object.keys(materialTypeMapping).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

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
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Mixed">Mixed</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 p-3">
          <Form.Label column sm={4} className="text-secondary">
            Quantity
          </Form.Label>
          <Col xs={12} sm={8}>
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
              <div className="text-primary fw-bold">Kg</div>
            </Stack>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-4 p-3">
          <Form.Label as="legend" column sm={4} className="text-secondary">
            Auction Status
          </Form.Label>
          <Col xs={12} sm={8}>
            {["All", "Ended", "Started", "Approved"].map((status) => (
              <Form.Check
                type="radio"
                label={status == "Approved" ? "Not Started" : status}
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
      </Container>
    </Form>
  );
}

export default Filters;
