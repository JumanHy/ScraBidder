import React from "react";
import { Formik } from "formik";
import { LinkContainer } from "react-router-bootstrap";
import logoImage from "../assets/images/ScraBidderLogo.png";
import { Container, Image, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const IndividualRegistration = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        "http://localhost:5192/api/account/register/individual",
        values
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Registration Successful!",
          text: "You have been registered successfully!",
          icon: "success",
          confirmButtonText: "Go to Home",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);

      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); // Handle server-side field-specific errors
      } else {
        setErrors({ submit: "Something went wrong. Please try again later." });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      className="my-4 p-3 rounded-2 shadow"
      style={{ maxWidth: "700px" }}
    >
      <Row className="justify-content-between align-items-center p-0">
        <Col xs={2} className="text-center">
          <Image style={{ maxWidth: "50px" }} src={logoImage} className="w-100" />
        </Col>
        <Col xs={6} md={4} className="d-flex align-items-center justify-content-end">
          Already a member?{" "}
          <LinkContainer to="/login">
            <Button variant="link" className="p-1">
              Login
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Container style={{ maxWidth: "600px" }} className="my-5 p-4">
          <h2 className="text-center text-primary mb-4">Register as individual</h2>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.firstName) errors.firstName = "First Name is required";
              if (!values.lastName) errors.lastName = "Last Name is required";
              if (!values.email) {
                errors.email = "Email is required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = "Phone number is required";
              } else if (!/^\d{10}$/.test(values.phoneNumber)) {
                errors.phoneNumber = "Phone number must be 10 digits";
              }
              if (!values.password) {
                errors.password = "Password is required";
              } else if (values.password.length < 6) {
                errors.password = "Password must be at least 6 characters";
              } else if (!/(?=.*[a-z])/.test(values.password)) {
                errors.password = "Password must contain at least one lowercase letter";
              } else if (!/(?=.*[A-Z])/.test(values.password)) {
                errors.password = "Password must contain at least one uppercase letter";
              } else if (!/(?=.*\d)/.test(values.password)) {
                errors.password = "Password must contain at least one number";
              } else if (!/(?=.*[!@#$%^&*])/.test(values.password)) {
                errors.password = "Password must contain at least one special character";
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = "Please confirm your password";
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
              }
              return errors;
            }}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <Form.Group controlId="firstName">
                      <Form.Label className="text-muted">First Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.firstName && errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6} className="mb-3">
                    <Form.Group controlId="lastName">
                      <Form.Label className="text-muted">Last Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.lastName && errors.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <Form.Group controlId="email">
                      <Form.Label className="text-muted">Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6} className="mb-3">
                    <Form.Group controlId="phoneNumber">
                      <Form.Label className="text-muted">Phone Number *</Form.Label>
                      <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.phoneNumber && errors.phoneNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <Form.Group controlId="password">
                      <Form.Label className="text-muted">Password *</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6} className="mb-3">
                    <Form.Group controlId="confirmPassword">
                      <Form.Label className="text-muted">Confirm Password *</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.confirmPassword && errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="d-flex justify-content-center mt-4">
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Register"}
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </Container>
      </Row>
    </Container>
  );
};

export default IndividualRegistration;
