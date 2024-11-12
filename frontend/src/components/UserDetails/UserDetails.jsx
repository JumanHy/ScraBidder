import React, { useState } from 'react';
import userImage from "@/assets/images/UserImage.png"; // Default image
import { FaEdit } from 'react-icons/fa'; // Edit icon import

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isServiceEditing, setIsServiceEditing] = useState(false); // For editing company service
  const [uploadedImage, setUploadedImage] = useState(null);

  // State for the form fields
  const [userInfo, setUserInfo] = useState({
    username: 'John Doe',
    email: 'example@example.com',
    phone: '123-456-7890',
    password: 'password123',
    address: '123 Main St, San Francisco, CA',
  });

  // State for company service details
  const [companyServiceInfo, setCompanyServiceInfo] = useState({
    companyName: '',
    serviceDetails: 'Basic service details here...', // Default service details
  });

  // State for user settings (New flexbox section)
  const [userSettings, setUserSettings] = useState({
    notifications: true,
    darkMode: false,
    companyPhotos: [] // Array to store uploaded photos
  });

  // Toggle modal visibility for user details
  const toggleEdit = () => setIsEditing(!isEditing);

  // Toggle edit mode for company service
  const toggleServiceEdit = () => setIsServiceEditing(!isServiceEditing);

  // Handle image upload
  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedPhotos = [...userSettings.companyPhotos];
        updatedPhotos[index] = reader.result; // Update the specific photo in the array
        setUserSettings({ ...userSettings, companyPhotos: updatedPhotos });
      };
      reader.readAsDataURL(file); // Convert the image to a Data URL to display it
    }
  };

  // Handle form field changes for user details
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Handle company service input change
  const handleServiceInputChange = (event) => {
    const { name, value } = event.target;
    setCompanyServiceInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Handle user settings toggle
  const handleSettingsChange = (event) => {
    const { name, checked } = event.target;
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Lato, sans-serif',
      }}
    >
      {/* Left Container: User Info */}
      <div
        style={{
          width: '32%', // Set width to make it equal with other sections
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)', // Add shadow for consistency
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h3>User Details</h3>
          <button
            className="btn btn-primary btn-sm"
            onClick={toggleEdit}
          >
            <FaEdit /> Edit Info
          </button>
        </div>

        {/* Image upload */}
        <img
          src={uploadedImage || userImage}
          alt="User Avatar"
          className="rounded-circle mt-3 mb-3"
          style={{ width: '100px', height: '100px' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, 0)} // Use index to differentiate
          style={{
            marginTop: '10px',
            display: 'block',
          }}
        />

        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phone}</p>
        <p><strong>Address:</strong> {userInfo.address}</p>

        {/* Modal for Editing User Info */}
        {isEditing && (
          <div className="modal show fade" style={{ display: 'block' }}>
            <div
              className="modal-dialog modal-sm"
              style={{
                maxWidth: '300px',
              }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit User Info</h5>
                  <button type="button" className="btn-close" onClick={toggleEdit}></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={userInfo.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={userInfo.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={userInfo.address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={toggleEdit}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={toggleEdit}>Save changes</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Middle Container: Company Service */}
      <div
        style={{
          width: '32%', // Same width as the other containers
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)', // Add shadow for consistency
        }}
      >
        <h3>Company Service</h3>
        <div className="d-flex justify-content-between">
          <textarea
            className="form-control"
            id="serviceDetails"
            name="serviceDetails"
            value={companyServiceInfo.serviceDetails}
            onChange={handleServiceInputChange}
            disabled={!isServiceEditing}
            style={{
              flex: 1,
              height: '200px',
              fontSize: '16px',
              padding: '10px',
            }}
          />
          <FaEdit
            onClick={toggleServiceEdit}
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
              fontSize: '20px',
            }}
          />
        </div>
      </div>

      {/* Right Container: Company Photos */}
      <div
        style={{
          width: '32%', // Same width as the other containers
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)', // Add shadow for consistency
        }}
      >
        <h3>Company Photos</h3>
        <p>Upload up to 3 photos for your company:</p>
        {[0, 1, 2].map((index) => (
          <div key={index} className="mb-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, index)} // Use index to differentiate photos
              style={{
                marginBottom: '10px',
              }}
            />
            {userSettings.companyPhotos[index] && (
              <img
                src={userSettings.companyPhotos[index]}
                alt={`Uploaded ${index + 1}`}
                className="img-thumbnail"
                style={{
                  width: '100px',
                  height: '100px',
                  marginTop: '10px',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
