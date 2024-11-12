import React from 'react';

const PaymentMethods = () => {
  return (
    <div className="container">
      <div className="row">
        {/* Card Details */}
        <div className="col-lg-4 mb-lg-0 mb-3">
          <div className="card p-3">
            <div className="img-box" style={{ width: '100px', height: '60px', overflow: 'hidden' }}>
              <img src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt="Visa logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="number">
              <label className="fw-bold">**** **** **** 1060</label>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small>
              <small><span className="fw-bold">Name:</span><span>Kumar</span></small>
            </div>
          </div>
        </div>

        {/* Other Card Details */}
        <div className="col-lg-4 mb-lg-0 mb-3">
          <div className="card p-3">
            <div className="img-box" style={{ width: '100px', height: '60px', overflow: 'hidden' }}>
              <img src="https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png" alt="Mastercard logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="number">
              <label className="fw-bold">**** **** **** 1060</label>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small>
              <small><span className="fw-bold">Name:</span><span>Kumar</span></small>
            </div>
          </div>
        </div>

        {/* More Card Details */}
        <div className="col-lg-4 mb-lg-0 mb-3">
          <div className="card p-3">
            <div className="img-box" style={{ width: '100px', height: '60px', overflow: 'hidden' }}>
              <img src="https://www.freepnglogos.com/uploads/discover-png-logo/credit-cards-discover-png-logo-4.png" alt="Discover logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="number">
              <label className="fw-bold">**** **** **** 1060</label>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small>
              <small><span className="fw-bold">Name:</span><span>Kumar</span></small>
            </div>
          </div>
        </div>

        

    
                      
                  
          

        
      </div>
    </div>
  );
};

export default PaymentMethods;
