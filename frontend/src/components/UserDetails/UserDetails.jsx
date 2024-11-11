import React, { useState } from 'react';
import logo from "@/assets/images/ScraBidderLogo.png";
import userImage from "@/assets/images/UserImage.png";
import { FaEdit } from 'react-icons/fa';

const UserDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState("This is a short description about me.");
  const [interestProgress, setInterestProgress] = useState({
    iron: 40,
    plastic: 60,
    copper: 80,
    aluminum: 30,
    glass: 50,
  });

  const toggleEdit = () => setIsEditing(!isEditing);
  const handleAboutMeChange = (event) => setAboutMe(event.target.value);
  const handleLanguageChange = (event) => setLanguage(event.target.value);

  return (
    <section style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)', fontFamily: 'Lato, sans-serif', marginTop: '-10px', width: '90%' }}>
      <div className="container" style={{ padding: '0' }}>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="card mb-3 rounded-3" style={{ borderRadius: '10px', border: '1px solid #e0cda1', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', padding: '10px' }}>
              <div className="card-body text-center" style={{ padding: '5px' }}>
                <img
                  src={userImage}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '100px', marginBottom: '10px' }}
                />
                <h6 className="my-2">username</h6>
                
                {/* Centered Add Photo Button */}
                <div className="text-center mb-3" style={{ textAlign: 'center' }}>
                  <button type="button" className="btn btn-sm" style={{ backgroundColor: '#033A70', color: 'white',Align: 'center' }}>
                    Add Photo
                  </button>
                </div>

                <div className="mt-2">
                  <h6 className="mb-2" style={{ textAlign: 'left' ,margintop: '20px'}}>About Me</h6>
                  {/* About Me Textarea */}
                  <textarea
                    className="form-control"
                    value={aboutMe}
                    onChange={handleAboutMeChange}
                    rows="2"
                    readOnly={!isEditing}
                    style={{ fontSize: '12px', padding: '5px', textAlign: 'left' }}
                  />
                  <button className="btn btn-sm btn-outline-primary mt-2" onClick={toggleEdit} style={{ backgroundColor: '#003A70', color: 'white' }}>
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Information Section */}
          <div className="col-12 col-md-6">
            <div className="card mb-3 rounded-3" style={{ borderRadius: '10px', border: '1px solid #e0cda1', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', padding: '10px' }}>
              <div className="card-body" style={{ padding: '5px' }}>
                {/* User Details Rows */}
                {[ 
                  { label: 'Full Name', value: 'Johnatan Smith' },
                  { label: 'Email', value: 'example@example.com' },
                  { label: 'Phone', value: '(097) 234-5678' },
                  { label: 'Address', value: 'Bay Area, San Francisco, CA' },

                  { label: 'Password', value: '********' },
                ].map(({ label, value }, idx) => (
                  <div key={idx} className="row mb-2">
                    <div className="col-4">
                      <p className="mb-0" style={{ fontSize: '12px' }}>{label}</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted mb-0" style={{ fontSize: '12px' }}>{value}</p>
                    </div>
                    <div className="col-2">
                      <button className="btn btn-sm btn-outline-secondary">
                        <FaEdit style={{ fontSize: '10px' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        

      </div>
    </section>
  );
};

export default UserDetails;
