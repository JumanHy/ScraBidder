import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Alert, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import "../styles/MultiStepForm.css";
import logoImage from '../assets/images/ScraBidderLogo.png';

// Validation schema for Formik
const validationSchemaStep1 = Yup.object().shape({
    companyName: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    companyNumber: Yup.string().required('Required'),
    companyEmail: Yup.string().email('Invalid email').required('Required'),
    companyRegNumber: Yup.string().required('Required'),
});

const validationSchemaStep2 = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    jobTitle: Yup.string().required('Required'),
    contactEmail: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string().required('Required'),
    linkedinProfile: Yup.string().url('Invalid URL').optional(),
});

const validationSchemaStep3 = Yup.object().shape({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'), // Add email validation
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
});

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const handleSubmit = (values) => {
        if (step === 3) {
            // Simulate form submission
            setTimeout(() => {
                setSubmissionMessage('Form submitted successfully!');
                console.log(values);
            }, 2000);
        } else {
            nextStep();
        }
    };

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <div className="form-container shadow-lg p-4 rounded">
                <header className="header d-flex justify-content-between align-items-center">
                    <div className="logo-container">
                        <Image style={{ maxWidth: "50px" }} src={logoImage} alt="Project Logo" className="w-100" />
                    </div>
                    <div className="login-link">
                        Already a member? <a href="/login">Log in</a>
                    </div>
                </header>
                <h2 className="text-center mb-4">Business Account Registration</h2>

                {submissionMessage && <Alert variant="success">{submissionMessage}</Alert>}

                <Formik
                    initialValues={{
                        companyName: '',
                        category: '',
                        country: '',
                        address: '',
                        companyNumber: '',
                        companyEmail: '',
                        companyRegNumber: '',
                        companyVision: '',
                        fullName: '',
                        jobTitle: '',
                        contactEmail: '',
                        phoneNumber: '',
                        linkedinProfile: '',
                        username: '',
                        email: '', // Add initial email value
                        password: '',
                        confirmPassword: '',
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
                        <Form onSubmit={handleSubmit}>
                            {step === 1 && (
                                <div>
                                    <h4>Step 1: Company Information</h4>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="companyName">
                                                <Form.Label>Company Name *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="companyName"
                                                    value={values.companyName}
                                                    onChange={handleChange}
                                                    isInvalid={touched.companyName && !!errors.companyName}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.companyName}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="category">
                                                <Form.Label>Category *</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    name="category"
                                                    value={values.category}
                                                    onChange={handleChange}
                                                    isInvalid={touched.category && !!errors.category}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="buyer">Buyer</option>
                                                    <option value="seller">Seller</option>
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Form.Group controlId="country">
                                                <Form.Label>Country *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="country"
                                                    value={values.country}
                                                    onChange={handleChange}
                                                    isInvalid={touched.country && !!errors.country}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Form.Group controlId="address">
                                                <Form.Label>Address *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address"
                                                    value={values.address}
                                                    onChange={handleChange}
                                                    isInvalid={touched.address && !!errors.address}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="companyNumber">
                                                <Form.Label>Company Number *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="companyNumber"
                                                    value={values.companyNumber}
                                                    onChange={handleChange}
                                                    isInvalid={touched.companyNumber && !!errors.companyNumber}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.companyNumber}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="companyEmail">
                                                <Form.Label>Company Email *</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="companyEmail"
                                                    value={values.companyEmail}
                                                    onChange={handleChange}
                                                    isInvalid={touched.companyEmail && !!errors.companyEmail}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.companyEmail}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Form.Group controlId="companyRegNumber">
                                                <Form.Label>Company Registration Number *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="companyRegNumber"
                                                    value={values.companyRegNumber}
                                                    onChange={handleChange}
                                                    isInvalid={touched.companyRegNumber && !!errors.companyRegNumber}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.companyRegNumber}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Form.Group controlId="companyVision">
                                                <Form.Label>Company Vision</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    name="companyVision"
                                                    value={values.companyVision}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary" type="submit">
                                        Next
                                    </Button>
                                </div>
                            )}

                            {step === 2 && (
                                <div>
                                    <h4>Step 2: Primary Contact Information</h4>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="fullName">
                                                <Form.Label>Full Name *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fullName"
                                                    value={values.fullName}
                                                    onChange={handleChange}
                                                    isInvalid={touched.fullName && !!errors.fullName}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="jobTitle">
                                                <Form.Label>Job Title *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="jobTitle"
                                                    value={values.jobTitle}
                                                    onChange={handleChange}
                                                    isInvalid={touched.jobTitle && !!errors.jobTitle}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.jobTitle}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <Form.Group controlId="contactEmail">
                                                <Form.Label>Contact Email *</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="contactEmail"
                                                    value={values.contactEmail}
                                                    onChange={handleChange}
                                                    isInvalid={touched.contactEmail && !!errors.contactEmail}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.contactEmail}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="phoneNumber">
                                                <Form.Label>Phone Number *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phoneNumber"
                                                    value={values.phoneNumber}
                                                    onChange={handleChange}
                                                    isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="linkedinProfile">
                                                <Form.Label>LinkedIn Profile</Form.Label>
                                                <Form.Control
                                                    type="url"
                                                    name="linkedinProfile"
                                                    value={values.linkedinProfile}
                                                    onChange={handleChange}
                                                    isInvalid={touched.linkedinProfile && !!errors.linkedinProfile}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.linkedinProfile}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="secondary" onClick={prevStep}>
                                        Back
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Next
                                    </Button>
                                </div>
                            )}

                            {step === 3 && (
                                <div>
                                    <h4>Step 3: Create Your Account</h4>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="username">
                                                <Form.Label>Username *</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="username"
                                                    value={values.username}
                                                    onChange={handleChange}
                                                    isInvalid={touched.username && !!errors.username}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="email">
                                                <Form.Label>Email *</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    isInvalid={touched.email && !!errors.email}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="password">
                                                <Form.Label>Password *</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    isInvalid={touched.password && !!errors.password}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Form.Group controlId="confirmPassword">
                                                <Form.Label>Confirm Password *</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={values.confirmPassword}
                                                    onChange={handleChange}
                                                    isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                                />
                                                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="secondary" onClick={prevStep}>
                                        Back
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default MultiStepForm;
