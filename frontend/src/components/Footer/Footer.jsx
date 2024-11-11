import React from "react";
import logo from "../../assets/images/ScraBidderLogo.png";
import { Image } from "react-bootstrap";

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
    <>
      <div
        className="bg-primary"
        style={{
          color: "#FFFFFF",
          letterSpacing: 3,
        }}
      >
        <div className="container p-5">
          <div className="row ">
            <div className="col-12 col-md-4 pb-2">
              <Image src={logo} style={{ maxWidth: "70px" }} />
              <span style={{ color: "white" }} className="fs-4 fw-bold ps-3">
                ScraBidder
              </span>
            </div>

            <div className="col-12 col-md-4 pb-2">
              <h4 className="pb-2">Help Center</h4>
              <a
                className="link"
                href="#"
                style={{ color: "white", textDecoration: "none" }}
              >
                <p>FAQ</p>
              </a>
              <a
                className="link"
                href="#"
                style={{ color: "white", textDecoration: "none" }}
              >
                <p>Contact Us</p>
              </a>
              <a
                className="link"
                href="#"
                style={{ color: "white", textDecoration: "none" }}
              >
                <p>Terms and Conditions</p>
              </a>
            </div>

            <div className="col-12 col-md-4 pb-2">
              <div>
                <h4 className="pb-2">Quick Links</h4>
                <a
                  className="link"
                  href="#"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <p>Home</p>
                </a>
                <a
                  className="link"
                  href="#"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <p>About Us</p>
                </a>
                <a
                  className="link"
                  href="#"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <p>Categories</p>
                </a>

                <div className="d-flex justify-start pb-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-3"
                  >
                    <FaFacebook size={30} color="white" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-3"
                  >
                    <FaInstagram size={30} color="white" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={30} color="white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;

{
  /*
  <div 
      className="d-flex flex-row justify-content-evenly align-items-center pt-5 pb-5"
      style={
        {
            backgroundColor:"#003A70",
            color:"#FFFFFF",
            letterSpacing:3
        }
      }
      >

        <div>
        <Image fluid src={logo} style={{ maxWidth: "70px" }} />
            <span style={{ color: "white"}} className="fs-3 fw-bold ps-3">
              ScraBidder
            </span>
        </div>

        <div>
            <h4 className='pb-2'>
                Help Center
            </h4>
            <a className='link' href='#' style={{color:'white',textDecoration:'none'}}><p>FAQ</p></a>
            <a className='link' href='#' style={{color:'white',textDecoration:'none'}}><p>Contact Us</p></a>
            <a className='link' href='#' style={{color:'white',textDecoration:'none'}}><p>Terms and Conditions</p></a>


        </div>

        <div>
        <h4 className='pb-2'>
                Quick Links
            </h4>
            <a className='link' href='#' style={{color:'white',textDecoration:'none'}}><p>Home</p></a>
            <a className='link' href='#' style={{color:'white',textDecoration:'none'}}><p>About Us</p></a>
            <a className='link' href='#' style={{color:'white',textDecoration:'none'}}><p>Categories</p></a>
           

            <div className="d-flex justify-start">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
        <FaFacebook size={30} color="white" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-3">
        <FaInstagram size={30} color="white" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={30} color="white" />
      </a>
    </div>
        </div>
      </div>
  */
}
