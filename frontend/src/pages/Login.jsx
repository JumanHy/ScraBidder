import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import logoImage from "../assets/images/ScraBidderLogo.png";
import { Container, Col, Row, Image, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Login = () => (
  <Container style={{ height: "100vh" }} className="my-2 shadow rounded-3">
    <Row className="h-100">
      <Col
        xs={12}
        sm={6}
        className="shadow-inner h-100 rounded-start-3 p-3 gap-3 d-flex flex-column align-items-center justify-content-center bg-primary text-white"
      >
        <Image
          src={logoImage}
          alt="Logo"
          className=""
          style={{ width: "150px" }}
        />
        <blockquote className="fs-5 fst-italic text-center">
          Your Gateway to Industrial Auctions
          <br />
          Bid, Win, and Grow with Confidence
        </blockquote>
      </Col>
      <Col
        xs={12}
        sm={6}
        className="p-5 h-100 d-flex flex-column justify-content-center"
      >
        <h2 className="text-center text-primary">Login</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) errors.email = "Email is required";
            else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            )
              errors.email = "Invalid email address";
            if (!values.password) errors.password = "Password is required";
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="container-fluid p-0">
              <Row className="gap-2">
                <Col xs={12} className="d-flex flex-column">
                  <label className="text-muted">Email *</label>
                  <Field
                    type="email"
                    name="email"
                    className=" rounded focus-ring p-2 border border-1"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col xs={12} className="d-flex flex-column">
                  <label className="text-muted">Password *</label>
                  <Field
                    type="password"
                    name="password"
                    className="p-2 focus-ring rounded border border-1"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col xs={12}>
                  <Button
                    variant="primary w-100 rounded p-2"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </Col>
                {/* Footer links */}
                <Col
                  xs={12}
                  className="d-flex flex-column align-items-center gap-2 justify-content-center text-muted"
                >
                  <p className="m-0 d-flex align-items-center">
                    Forgot password?{" "}
                    <LinkContainer to="/reset-password">
                      <Button variant="link" className="p-1">
                        Reset it
                      </Button>
                    </LinkContainer>
                  </p>
                  <p className="m-0 d-flex align-items-center">
                    Don't have an account?{" "}
                    <LinkContainer to="/individual-register">
                      <Button variant="link" className="p-1">
                        individual
                      </Button>
                    </LinkContainer>
                    <span className="">Or</span>
                    <LinkContainer to="/business-register">
                      <Button variant="link" className="p-1">
                        business
                      </Button>
                    </LinkContainer>
                  </p>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  </Container>
);

export default Login;
