import React from "react";
import { Formik } from "formik";
import { LinkContainer } from "react-router-bootstrap";
import logoImage from "../assets/images/ScraBidderLogo.png";
import { Container, Image, Row, Col, Form, Button } from "react-bootstrap";

const IndividualRegistration = () => (
  <Container
    className="my-4 p-3 rounded-2 shadow"
    style={{ maxWidth: "700px" }}
  >
    <Row className="justify-content-between align-items-center p-0">
      <Col xs={2} className="text-center">
        <Image style={{ maxWidth: "50px" }} src={logoImage} className="w-100" />
      </Col>
      <Col xs={6} md={4} className="">
        <Row className="justify-content-end ">
          <div className="d-flex align-items-center">
            Already a member?{" "}
            <LinkContainer to="/login">
              <Button variant="link" className="p-1">
                Login
              </Button>
            </LinkContainer>
          </div>
        </Row>
      </Col>
    </Row>
    <Row>
      <Container style={{ maxWidth: "600px" }} className="my-5 p-4">
        <h2 className="text-center text-primary mb-4">
          Register as individual
        </h2>

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
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Please confirm your password";
            } else if (values.password !== values.confirmPassword) {
              errors.confirmPassword = "Passwords do not match";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
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
                    <Form.Label className="text-muted">
                      Phone Number *
                    </Form.Label>
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
                    <Form.Label className="text-muted">
                      Confirm Password *
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-grid gap-2 mt-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="py-2"
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </Row>
  </Container>
);

export default IndividualRegistration;
