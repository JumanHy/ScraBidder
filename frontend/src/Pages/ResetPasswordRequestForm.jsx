import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import "../styles/ResetPassword.css"; // Import the same CSS file for consistent styling
import logoImage from '../assets/images/ScraBidderLogo.png';

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('/api/auth/reset-password', { email });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response.data.message || 'Something went wrong!');
        }
    };

    return (
        <Container className="reset-container">
            <div className="reset-form-wrapper">
                <div className="header-with-logo">
                    <img src={logoImage} alt="Logo" className="reset-logo" />
                    <h2 className="form-heading">Reset Password</h2>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="submit-button">Send Reset Link</Button>
                </Form>
                {message && <div className="alert alert-success mt-3">{message}</div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
        </Container>
    );
};

export default ResetPasswordRequest;
