import React from "react";
import logo from "../../assets/images/ScraBidderLogo.png";
import { Image } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="container-fluid shadow-lg bg-light  text-primary p-4">
      <div className="row justify-content-between align-items-center">
        {/* Logo Column */}
        <div className="col-5  col-sm-4 col-md-3 col-lg-2 text-center mb-3 mb-md-0">
          <Image src={logo} fluid />
        </div>

        {/* Help Center Column */}
        <div className="col-12 col-sm-6 col-md-3 text-primary text-start mb-3 mb-md-0">
          <h4 className="pb-2 ">Help Center</h4>

          <span>
            <a href="#">FAQ </a>
          </span>

          <br />

          <span>
            <a href="#">Contact Us </a>
          </span>

          <br />

          <span>
            <a href="#">Terms and Conditions </a>
          </span>
        </div>

        {/* Quick Links Column */}
        <div className=" col-12 col-sm-6 col-md-3 text-primary mb-3 mb-md-0">
          <h4 className="pb-2">Quick Links</h4>
          <span>
            <a href="#">Home</a>
          </span>
          <br />
          <span>
            <a href="#">About Us</a>
          </span>
          <br />

          <span>
            <a href="#">Categories </a>
          </span>
        </div>
        <div className=" col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
          <h4 className="pb-2">Contact Us</h4>
          <p className="m-0">123 Main Street, City, Country</p>
          <p className="m-0">Email: support@scrabidder.com</p>
          <p className="m-0">Phone: +1 234 567 890</p>
        </div>
      </div>

      <div className="row justify-content-center pt-3">
        <div className="col-auto">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3"
          >
            <FaInstagram size={30} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>
      {/* Divider Line */}
      <hr className="border-top border-dark mt-4" />
      <div className="text-center mt-2">
        <p className="mb-0 text-primary fw-bold">
          &copy; 2024 ScraBidder. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
