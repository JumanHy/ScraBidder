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
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const phoneNumberRegex = /^[0-9]{10,15}$/;
const validationSchemaStep1 = Yup.object().shape({
  businessName: Yup.string().required("Required"),
  businessType: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  businessNumber: Yup.string()
    .matches(phoneNumberRegex, "Company Number must be between 10 to 15 digits")
    .required("Company Number is required"),
    businessEmail: Yup.string().email("Invalid email").required("Required"),
    registrationNumber: Yup.string().required("Required"),
});


const validationSchemaStep2 = Yup.object().shape({
  primaryContactFirstName: Yup.string().required("Required"),
  primaryContactLastName: Yup.string().required("Required"),
  primaryJobTitle: Yup.string().required("Required"),
  primaryContactEmail: Yup.string().email("Invalid email").required("Required"),
  primaryPhoneNumber: Yup.string()
    .matches(phoneNumberRegex, "Phone Number must be between 10 to 15 digits")
    .required("Phone Number is required"),
  linkedIn: Yup.string().url("Invalid URL").optional(),
});


const validationSchemaStep3 = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});



const BusinessRegistration = () => {
  const [step, setStep] = useState(1);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (values) => {
    console.log(values);
    if (step === 3) {  
      try {
      
        const response = await axios.post("http://localhost:5192/api/account/register/business", values);

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your form has been submitted successfully.',
            confirmButtonText: 'Go to Home',
          }).then(() => {
            navigate("/"); 
          });
          setSubmissionMessage("Your form has been submitted successfully."); 
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'There was an issue with the registration.',
          });
          setSubmissionMessage("There was an issue with the registration."); // Set error message
        }
      } catch (error) {
        console.error("There was an error submitting the form!", error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Something went wrong. Please try again later.',
        });
        setSubmissionMessage("Something went wrong. Please try again later."); // Set error message
      }
    } else {
      nextStep();
    }
  };

  console.log('Current Step:', step);

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
          {submissionMessage && <Alert variant="info">{submissionMessage}</Alert>}

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
            businessName: "",
            businessType: "",
            address: "",
            businessNumber: "",
            businessEmail: "",
            registrationNumber: "",
            companyVision: "",
            primaryContactFirstName: "", // Updated field name
            primaryContactLastName: "",  // Updated field name
            primaryJobTitle: "",         // Updated field name
            primaryContactEmail: "",     // Updated field name
            primaryPhoneNumber: "",      // Updated field name
            linkedIn: "",
          
            email: "",                   // Add initial email value
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
                        <Form.Group controlId="businessName">
                          <Form.Label className="text-muted">
                            Company Name *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="businessName"
                            value={values.businessName}
                            onChange={handleChange}
                            isInvalid={
                              touched.businessName && !!errors.businessName
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.businessName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12} md={6}>
                        <Form.Group controlId="businessType">
                          <Form.Label className="text-muted">
                            businessType *
                          </Form.Label>
                          <Form.Select
                            as="select"
                            name="businessType"
                            value={values.businessType}
                            onChange={handleChange}
                            isInvalid={touched.businessType && !!errors.businessType}
                          >
                            <option value="">Select...</option>
                            <option value="Buyer">Buyer</option>
                            <option value="Seller">Seller</option>
                            <option value="Both">Both</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.businessType}
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
  <Form.Group controlId="businessNumber">
    <Form.Label className="text-muted">
      Company Number *
    </Form.Label>
    <Form.Control
      type="text"
      name="businessNumber"
      value={values.businessNumber}
      onChange={handleChange}
      isInvalid={touched.businessNumber && !!errors.businessNumber}
      placeholder="0700000000" // Placeholder indicating expected company number format
    />
    <Form.Control.Feedback type="invalid">
      {errors.businessNumber ? errors.businessNumber : "Please enter a valid company number"}  {/* Custom error message */}
    </Form.Control.Feedback>
  </Form.Group>
</Col>

                      <Col xs={12} md={6}>
                        <Form.Group controlId="businessEmail">
                          <Form.Label className="text-muted">
                            Company Email *
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="businessEmail"
                            value={values.businessEmail}
                            onChange={handleChange}
                            isInvalid={
                              touched.businessEmail && !!errors.businessEmail
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.businessEmail}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group controlId="registrationNumber">
                          <Form.Label className="text-muted">
                            Company Registration Number *
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="registrationNumber"
                            value={values.registrationNumber}
                            onChange={handleChange}
                            isInvalid={
                              touched.registrationNumber &&
                              !!errors.registrationNumber
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.registrationNumber}
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
      primary Contact Information
    </h6>
    <Row className="p-3 gy-4">
      <Col xs={12} md={6}>
        <Form.Group controlId="primaryContactFirstName">
          <Form.Label className="text-muted">
            First Name *
          </Form.Label>
          <Form.Control
            type="text"
            name="primaryContactFirstName"
            value={values.primaryContactFirstName}
            onChange={handleChange}
            isInvalid={touched.primaryContactFirstName && !!errors.primaryContactFirstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.primaryContactFirstName}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col xs={12} md={6}>
        <Form.Group controlId="primaryContactLastName">
          <Form.Label className="text-muted">
            Last Name *
          </Form.Label>
          <Form.Control
            type="text"
            name="primaryContactLastName"
            value={values.primaryContactLastName}
            onChange={handleChange}
            isInvalid={touched.primaryContactLastName && !!errors.primaryContactLastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.primaryContactLastName}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col xs={12}>
        <Form.Group controlId="primaryJobTitle">
          <Form.Label className="text-muted">
            Job Title *
          </Form.Label>
          <Form.Control
            type="text"
            name="primaryJobTitle"
            value={values.primaryJobTitle}
            onChange={handleChange}
            isInvalid={touched.primaryJobTitle && !!errors.primaryJobTitle}
          />
          <Form.Control.Feedback type="invalid">
            {errors.primaryJobTitle}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col xs={12}>
        <Form.Group controlId="primaryContactEmail">
          <Form.Label className="text-muted">
            Contact Email *
          </Form.Label>
          <Form.Control
            type="email"
            name="primaryContactEmail"
            value={values.primaryContactEmail}
            onChange={handleChange}
            isInvalid={touched.primaryContactEmail && !!errors.primaryContactEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.primaryContactEmail}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>

      <Col xs={12} md={6}>
  <Form.Group controlId="primaryPhoneNumber">
    <Form.Label className="text-muted">
      Phone Number *
    </Form.Label>
    <Form.Control
      type="text"
      name="primaryPhoneNumber"
      value={values.primaryPhoneNumber}
      onChange={handleChange}
      isInvalid={touched.primaryPhoneNumber && !!errors.primaryPhoneNumber}
      placeholder="0700000000" // Added a placeholder for phone format guidance
    />
    <Form.Control.Feedback type="invalid">
      {errors.primaryPhoneNumber ? errors.primaryPhoneNumber : "Please enter a valid phone number"}  {/* Custom error message */}
    </Form.Control.Feedback>
  </Form.Group>
</Col>


      <Col xs={12} md={6}>
        <Form.Group controlId="linkedIn">
          <Form.Label className="text-muted">
            LinkedIn Profile
          </Form.Label>
          <Form.Control
            type="url"
            name="linkedIn"
            value={values.linkedIn}
            onChange={handleChange}
            isInvalid={touched.linkedIn && !!errors.linkedIn}
          />
          <Form.Control.Feedback type="invalid">
            {errors.linkedIn}
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
                      <Form.Group controlId="email">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
