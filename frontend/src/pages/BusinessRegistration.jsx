import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Alert,
  Image,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { LinkContainer } from "react-router-bootstrap";
import logoImage from "../assets/images/ScraBidderLogo.png";

// Validation schema for Formik
const validationSchemaStep1 = Yup.object().shape({
  companyName: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  companyNumber: Yup.string().required("Required"),
  companyEmail: Yup.string().email("Invalid email").required("Required"),
  companyRegNumber: Yup.string().required("Required"),
});

const validationSchemaStep2 = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  jobTitle: Yup.string().required("Required"),
  contactEmail: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().required("Required"),
  linkedinProfile: Yup.string().url("Invalid URL").optional(),
});

const validationSchemaStep3 = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"), // Add email validation
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const BusinessRegistration = () => {
  const [step, setStep] = useState(1);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (values) => {
    if (step === 3) {
      // Simulate form submission
      setTimeout(() => {
        setSubmissionMessage("Form submitted successfully!");
        console.log(values);
      }, 10);
    } else {
      nextStep();
    }
  };

  return (
    <Container
      style={{ maxWidth: "670px" }}
      className="my-5 shadow rounded justify-content-center" 
    >
      <Row className="p-4 gap-3">
        <Col
          xs={12}
          className=" d-flex justify-content-between align-items-center"
        >
          <div className="">
            <Image
              style={{ maxWidth: "50px" }}
              src={logoImage}
              alt="Logo"
              className="w-100"
            />
          </div>
          <div className="d-flex align-items-center text-muted">
            Already a member?{" "}
            <LinkContainer to="/login">
              <Button variant="link" className="p-1">
                Login
              </Button>
            </LinkContainer>
          </div>
        </Col>
        <Col xs={12} className="">
          <h3 className="text-center text-primary">
            Business Account Registration
          </h3>

          <Col xs={12} className="">
            <div className="d-flex  justify-content-between align-items-center">
              {/* Step 1 */}
              <div
                className={`rounded-circle d-flex justify-content-center align-items-center ${
                  step >= 1
                    ? "bg-primary text-white"
                    : "border border-primary text-primary"
                }`}
                style={{ width: "40px", height: "40px" }} // Ensuring all circles are the same size
              >
                1
              </div>

              {/* Line between circles (dynamically fills remaining space) */}
              <div
                style={{ flexGrow: 1, height: "5px" }} // Ensures lines take up remaining space
                className={` rounded-5 ${
                  step > 1 ? "bg-primary" : "border-primary"
                }`}
              ></div>

              {/* Step 2 */}
              <div
                className={`rounded-circle d-flex justify-content-center align-items-center ${
                  step >= 2
                    ? "bg-primary text-white"
                    : "border border-2  border-primary text-primary"
                }`}
                style={{ width: "40px", height: "40px" }} // Ensuring all circles are the same size
              >
                2
              </div>

              {/* Line between circles (dynamically fills remaining space) */}
              <div
                style={{ flexGrow: 1, height: "5px" }} // Ensures lines take up remaining space
                className={`rounded-5 ${
                  step > 2 ? "bg-primary" : "border-primary"
                }`}
              ></div>

              {/* Step 3 */}
              <div
                className={`rounded-circle d-flex justify-content-center align-items-center ${
                  step >= 3
                    ? "bg-primary text-white"
                    : "border border-2 border-primary text-primary"
                }`}
                style={{ width: "40px", height: "40px" }} // Ensuring all circles are the same size
              >
                3
              </div>
            </div>
          </Col>
        </Col>
        <Col xs={12} className=" p-0">
          {submissionMessage && (
            <Alert variant="success">{submissionMessage}</Alert>
          )}

          <Formik
            initialValues={{
              companyName: "",
              category: "",
              country: "",
              address: "",
              companyNumber: "",
              companyEmail: "",
              companyRegNumber: "",
              companyVision: "",
              fullName: "",
              jobTitle: "",
              contactEmail: "",
              phoneNumber: "",
              linkedinProfile: "",
              username: "",
              email: "", // Add initial email value
              password: "",
              confirmPassword: "",
            }}
            validationSchema={
              step === 1
                ? validationSchemaStep1
                : step === 2
                ? validationSchemaStep2
                : validationSchemaStep3
            }
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form onSubmit={handleSubmit} className="border">
                {step === 1 && (
                  <div>
                    <h6 className="text-white bg-primary p-4">
                      Company Information
                    </h6>
                    <Row className="p-3 gy-4">
                      <Col xs={12} md={6}>
                        <Form.Group controlId="companyName">
                          <Form.Label className="text-muted">
                            Company Name *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="companyName"
                            value={values.companyName}
                            onChange={handleChange}
                            isInvalid={
                              touched.companyName && !!errors.companyName
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.companyName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="category">
                          <Form.Label className="text-muted">
                            Category *
                          </Form.Label>
                          <Form.Select
                            as="select"
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                            isInvalid={touched.category && !!errors.category}
                          >
                            <option value="">Select...</option>
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                            <option value="both">Both</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.category}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={12}>
                        <Form.Group controlId="country">
                          <Form.Label className="text-muted">
                            Country *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="country"
                            value={values.country}
                            onChange={handleChange}
                            isInvalid={touched.country && !!errors.country}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.country}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={12}>
                        <Form.Group controlId="address">
                          <Form.Label className="text-muted">
                            Address *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            isInvalid={touched.address && !!errors.address}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.address}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        <Form.Group controlId="companyNumber">
                          <Form.Label className="text-muted">
                            Company Number *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="companyNumber"
                            value={values.companyNumber}
                            onChange={handleChange}
                            isInvalid={
                              touched.companyNumber && !!errors.companyNumber
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.companyNumber}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="companyEmail">
                          <Form.Label className="text-muted">
                            Company Email *
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="companyEmail"
                            value={values.companyEmail}
                            onChange={handleChange}
                            isInvalid={
                              touched.companyEmail && !!errors.companyEmail
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.companyEmail}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group controlId="companyRegNumber">
                          <Form.Label className="text-muted">
                            Company Registration Number *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="companyRegNumber"
                            value={values.companyRegNumber}
                            onChange={handleChange}
                            isInvalid={
                              touched.companyRegNumber &&
                              !!errors.companyRegNumber
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.companyRegNumber}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={12}>
                        <Form.Group controlId="companyVision">
                          <Form.Label className="text-muted">
                            Company Vision
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            name="companyVision"
                            value={values.companyVision}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} className=" d-flex justify-content-center">
                        <Button variant="primary" type="submit">
                          Next
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h6 className="text-white bg-primary p-4">
                      Primary Contact Information
                    </h6>
                    <Row className="p-3 gy-4">
                      <Col xs={12} md={6}>
                        <Form.Group controlId="fullName">
                          <Form.Label className="text-muted">
                            Full Name *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            value={values.fullName}
                            onChange={handleChange}
                            isInvalid={touched.fullName && !!errors.fullName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.fullName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="jobTitle">
                          <Form.Label className="text-muted">
                            Job Title *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="jobTitle"
                            value={values.jobTitle}
                            onChange={handleChange}
                            isInvalid={touched.jobTitle && !!errors.jobTitle}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.jobTitle}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={12}>
                        <Form.Group controlId="contactEmail">
                          <Form.Label className="text-muted">
                            Contact Email *
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="contactEmail"
                            value={values.contactEmail}
                            onChange={handleChange}
                            isInvalid={
                              touched.contactEmail && !!errors.contactEmail
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.contactEmail}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        <Form.Group controlId="phoneNumber">
                          <Form.Label className="text-muted">
                            Phone Number *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            isInvalid={
                              touched.phoneNumber && !!errors.phoneNumber
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="linkedinProfile">
                          <Form.Label className="text-muted">
                            LinkedIn Profile
                          </Form.Label>
                          <Form.Control
                            type="url"
                            name="linkedinProfile"
                            value={values.linkedinProfile}
                            onChange={handleChange}
                            isInvalid={
                              touched.linkedinProfile &&
                              !!errors.linkedinProfile
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.linkedinProfile}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col
                        xs={12}
                        className="d-flex justify-content-center gap-5 align-items-center"
                      >
                        <Button
                          variant="secondary"
                          className="text-white"
                          onClick={prevStep}
                        >
                          Back
                        </Button>
                        <Button variant="primary" type="submit">
                          Next
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h6 className="text-white bg-primary p-4">
                      Create Your Account
                    </h6>

                    <Row className="p-3 gy-4">
                      <Col xs={12} md={6}>
                        <Form.Group controlId="username">
                          <Form.Label className="text-muted">
                            Username *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={touched.username && !!errors.username}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.username}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="email">
                          <Form.Label className="text-muted">
                            Email *
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={touched.email && !!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        <Form.Group controlId="password">
                          <Form.Label className="text-muted">
                            Password *
                          </Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={touched.password && !!errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="confirmPassword">
                          <Form.Label className="text-muted">
                            Confirm Password *
                          </Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            isInvalid={
                              touched.confirmPassword &&
                              !!errors.confirmPassword
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col
                        xs={12}
                        className="d-flex justify-content-center gap-5 align-items-center"
                      >
                        <Button
                          variant="secondary"
                          className="text-white"
                          onClick={prevStep}
                        >
                          Back
                        </Button>
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default BusinessRegistration;
