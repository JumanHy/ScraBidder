import React from 'react';
import { Formik } from 'formik';
import '../styles/Registration.css';

// Import the logo image
import logoImage from '../components/output-onlinepngtools.png'; // Adjust the path as necessary

const Registration = () => (
  <div className="outer-container">
    <div className="form-container">
      <header className="header">
        <img src={logoImage} alt="Project Logo" className="logo" />
        <div className="login-link">
          Already a member? <a href="/login">Log in</a>
        </div>
      </header>
      <h1>Register as Individual</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'First Name is required';
          }
          if (!values.lastName) {
            errors.lastName = 'Last Name is required';
          }
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.phoneNumber) {
            errors.phoneNumber = 'Phone number is required';
          } else if (!/^\d{10}$/.test(values.phoneNumber)) {
            errors.phoneNumber = 'Phone number must be 10 digits';
          }
          if (!values.password) {
            errors.password = 'Password is required';
          } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
          } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
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
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label className="label">First Name *</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                className="input-field"
              />
              {errors.firstName && touched.firstName && (
                <div className="error">{errors.firstName}</div>
              )}
            </div>

            <div className="form-group">
              <label className="label">Last Name *</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                className="input-field"
              />
              {errors.lastName && touched.lastName && (
                <div className="error">{errors.lastName}</div>
              )}
            </div>

            <div className="form-group">
              <label className="label">Email *</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="input-field"
              />
              {errors.email && touched.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="label">Phone Number *</label>
              <input
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                className="input-field"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className="error">{errors.phoneNumber}</div>
              )}
            </div>

            <div className="form-group">
              <label className="label">Password *</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="input-field"
              />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <label className="label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                className="input-field"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="error">{errors.confirmPassword}</div>
              )}
            </div>

            {/* Button container for centering the submit button */}
            <div className="button-container">
              <button type="submit" disabled={isSubmitting} className="submit-button">
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  </div>
);

export default Registration;
