import React, { useState } from 'react';
import userImage from "@/assets/images/UserImage.png"; // Default image
import { FaEdit } from 'react-icons/fa'; // Edit icon import

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // State for the form fields
  const [userInfo, setUserInfo] = useState({
    username: 'John Doe',
    email: 'example@example.com',
    phone: '123-456-7890',
    password: 'password123',
    address: '123 Main St, San Francisco, CA',
  });

  // Toggle modal visibility for user details
  const toggleEdit = () => setIsEditing(!isEditing);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        fontFamily: 'Lato, sans-serif',
      }}
    >
      {/* User Info */}
      <div
        style={{
          width: '100%', // Set full width as it's the only container now
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
          onChange={handleImageUpload}
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
    </div>
  );
};

export default UserDetails;
