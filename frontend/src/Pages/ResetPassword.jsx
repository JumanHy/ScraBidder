import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import "../styles/ResetPassword.css";
import logoImage from '../assets/images/ScraBidderLogo.png';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
});

const ResetPassword = () => {
    const { token } = useParams();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('/api/auth/reset-password/confirm', { token, password: values.password });
            alert(response.data.message); // Display success message
        } catch (err) {
            setErrors({ server: err.response?.data?.message || 'Something went wrong!' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="reset-container">
            <div className="reset-form-wrapper">
                <div className="header-with-logo">
                    <img src={logoImage} alt="Logo" className="reset-logo" />
                    <h2 className="form-heading">Set New Password</h2>
                </div>

                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter new password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.password && errors.password}
                                    required
                                />
                                {touched.password && errors.password && (
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.confirmPassword && errors.confirmPassword}
                                    required
                                />
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Button variant="primary" type="submit" className="submit-button" disabled={isSubmitting}>
                                Reset Password
                            </Button>
                            {errors.server && <div className="alert alert-danger mt-3">{errors.server}</div>}
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
};

export default ResetPassword;
