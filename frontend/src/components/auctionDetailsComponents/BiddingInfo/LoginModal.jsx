import React from "react";
import {
  Modal,
  Button,
  Form,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import ScraBidderLogo from "@/assets/images/ScraBidderLogo.png";
import useForm from "@/hooks/useForm";
export default function LoginModal({ show, onHide, onLoginSuccess }) {
  const initialValues = { email: "", password: "" };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    onLoginSuccess
  );

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="text-primary">Welcome Back!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="bg-light p-4 rounded-3 shadow-sm">
          <Row className="justify-content-center align-items-center mb-4">
            <Col xs={4} className="text-center">
              <Image src={ScraBidderLogo} className="object-fit-cover w-100" />
            </Col>
            <Col xs={8}>
              <h4 className="m-0 text-primary">ScraBidder</h4>
              <p className="m-0 text-muted">Your gateway to scrap auctions</p>
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label className="text-primary-emphasis">
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label className="text-primary-emphasis">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid mt-4">
              <Button
                variant="primary"
                type="submit"
                className="rounded-pill shadow"
                style={{ padding: "0.6rem", fontSize: "1rem" }}
                disabled={
                  !values.email ||
                  !values.password ||
                  errors.email ||
                  errors.password
                }
              >
                Login
              </Button>
            </div>

            <div className="text-center mt-3">
              <a href="/forgot-password" className="text-muted">
                Forgot your password?
              </a>
            </div>
            <div className="text-center mt-2">
              <span className="text-muted">Don't have an account? </span>
              <a
                href="/register"
                className="text-decoration-none text-primary fw-bold"
              >
                Register
              </a>
            </div>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
