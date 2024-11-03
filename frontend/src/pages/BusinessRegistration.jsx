import React from 'react';
import { Formik } from 'formik';
import '../styles/BusinessRegistration.css'; 

// Import the logo image
import logoImage from '../components/output-onlinepngtools.png'; 

const BusinessRegistration = () => (
  <div className="outer-container">
    <div className="form-container">
      <header className="header">
        <img src={logoImage} alt="Project Logo" className="logo" />
        <div className="login-link">
          Already a member? <a href="/login">Log in</a>
        </div>
      </header>
      <h1>Let's get you started</h1>
      <h5>Enter the details to get going</h5>
      <h8>General Details</h8>
      <Formik
        initialValues={{
          companyName: '',
          email: '',
          phoneNumber: '',
          registrationNumber: '',
          country: '',
          address: '',
          password: '',
          confirmPassword: '',
          fullName: '', // New field
          jobTitle: '', // New field
          contactEmail: '', // New field
          contactPhoneNumber: '', // New field
          linkedinProfile: '', // New field
          companyVision: '', // New field
        }}
        validate={values => {
          const errors = {};
          // Existing validations...
          if (!values.companyName) {
            errors.companyName = 'Company Name is required';
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
          if (!values.registrationNumber) {
            errors.registrationNumber = 'Registration Number is required';
          }
          if (!values.country) {
            errors.country = 'Country is required';
          }
          if (!values.address) {
            errors.address = 'Address is required';
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

          // New validations for Primary Contact Details
          if (!values.fullName) {
            errors.fullName = 'Full Name is required';
          }
          if (!values.jobTitle) {
            errors.jobTitle = 'Job Title is required';
          }
          if (!values.contactEmail) {
            errors.contactEmail = 'Contact Email is required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.contactEmail)) {
            errors.contactEmail = 'Invalid email address';
          }
          if (!values.contactPhoneNumber) {
            errors.contactPhoneNumber = 'Contact Phone Number is required';
          } else if (!/^\d{10}$/.test(values.contactPhoneNumber)) {
            errors.contactPhoneNumber = 'Contact Phone Number must be 10 digits';
          }
          if (!values.companyVision) {
            errors.companyVision = 'Company Vision is required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2)); // Replace with actual submission logic
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
            {/* Existing fields */}
            <div>
              <label className="label">Company Name *</label>
              <input
                type="text"
                name="companyName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyName}
                className="input-field"
              />
              {errors.companyName && touched.companyName && (
                <div className="error">{errors.companyName}</div>
              )}
            </div>

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

            <div>
              <label className="label">Registration Number *</label>
              <input
                type="text"
                name="registrationNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.registrationNumber}
                className="input-field"
              />
              {errors.registrationNumber && touched.registrationNumber && (
                <div className="error">{errors.registrationNumber}</div>
              )}
            </div>

            <div>
              <label className="label">Country *</label>
              <input
                type="text"
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
                className="input-field"
              />
              {errors.country && touched.country && (
                <div className="error">{errors.country}</div>
              )}
            </div>

            <div>
              <label className="label">Address *</label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                className="input-field"
              />
              {errors.address && touched.address && (
                <div className="error">{errors.address}</div>
              )}
            </div>

            {/* <div> */}
              {/* <label className="label">Password *</label>
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

            <div>
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
            </div> */}

            {/* New Primary Contact Details Section */}
            <h3>Primary Contact Details</h3>
            <br/>

            <div>
              <label className="label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
                className="input-field"
              />
              {errors.fullName && touched.fullName && (
                <div className="error">{errors.fullName}</div>
              )}
            </div>

            <div>
              <label className="label">Job Title *</label>
              <input
                type="text"
                name="jobTitle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobTitle}
                className="input-field"
              />
              {errors.jobTitle && touched.jobTitle && (
                <div className="error">{errors.jobTitle}</div>
              )}
            </div>

            <div>
              <label className="label">Contact Email *</label>
              <input
                type="email"
                name="contactEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contactEmail}
                className="input-field"
              />
              {errors.contactEmail && touched.contactEmail && (
                <div className="error">{errors.contactEmail}</div>
              )}
            </div>

            <div>
              <label className="label">Contact Phone Number *</label>
              <input
                type="text"
                name="contactPhoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contactPhoneNumber}
                className="input-field"
              />
              {errors.contactPhoneNumber && touched.contactPhoneNumber && (
                <div className="error">{errors.contactPhoneNumber}</div>
              )}
            </div>

            <div>
              <label className="label">LinkedIn Profile</label>
              <input
                type="text"
                name="linkedinProfile"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.linkedinProfile}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Company Vision *</label>
              <textarea
                name="companyVision"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyVision}
                className="input-field"
              />
              {errors.companyVision && touched.companyVision && (
                <div className="error">{errors.companyVision}</div>
              )}
            </div>
           
            
            {/* <h3>Account Information</h3>
<p className="small-text">This information will be used to create your account.</p>

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
  {errors.password && touched.password && (
    <div className="error">{errors.password}</div>
  )}
</div>

<div>
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

 */}

            <button type="submit" disabled={isSubmitting} className="submit-button">
              Register
            </button>
          </form>
        )}
      </Formik>
    </div>
  </div>
);

export default BusinessRegistration;
