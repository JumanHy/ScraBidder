import React from 'react';
import { Formik } from 'formik';
import '../styles/Login.css'; 

import logoImage from '../components/output-onlinepngtools.png'; // Adjust the path to your logo image

const Login = () => (
  <div className="outer-container">
    <div className="logo-section">
      <img src={logoImage} alt="Project Logo" className="logo" />
      <blockquote className="quote">
        Your Gateway to Industrial Auctions<br />
        Bid, Win, and Grow with Confidence
      </blockquote>
    </div>
    <div className="login-section">
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.email) errors.email = 'Email is required';
          else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email address';
          if (!values.password) errors.password = 'Password is required';
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
          <form onSubmit={handleSubmit} className="login-form">
            <div>
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

            <div>
              <label className="label">Password *</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="input-field"
              />
              {errors.password && touched.password && <div className="error">{errors.password}</div>}
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Login
            </button>
          </form>
        )}
      </Formik>
    </div>
  </div>
);

export default Login;
