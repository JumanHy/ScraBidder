import React from "react";
import { Image } from "react-bootstrap";
import Slider from "react-slick"; // Importing Slick Carousel
import "slick-carousel/slick/slick.css"; // Import the slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Import the slick carousel theme
import "./style.css";
// Example partner logos (replace with actual logo paths)
import logo1 from "@/assets/images/logo1.png";
import logo2 from "@/assets/images/logo2.png";

function OurPartners() {
  // Slick Carousel Settings
  const settings = {
    infinite: true, // Infinite scrolling
    slidesToShow: 4, // Number of slides shown at once (adjust for different screen sizes)
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true,
    dots: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 slides on larger screens
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Show 1 slide on smaller screens
        },
      },
    ],
  };

  return (
    <div
      className="text-primary p-4 pt-0 our-partners-carousel"
      style={{
        backgroundColor: "#E6E6E6",
      }}
    >
      <div className="container text-center p-4">
        <h2 className="pb-5" style={{ letterSpacing: 5 }}>
          Our Partners
        </h2>

        {/* Slick Carousel Component */}
        <Slider {...settings}>
          {/* Partner 1 */}
          <div className="d-flex justify-content-center align-items-center  pb-5">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "100%",
                height: "200px",
                maxWidth: "200px",
              }}
            >
              <Image
                src={logo1}
                alt="logo"
                fluid
                style={{
                  objectFit: "contain", // Maintain aspect ratio without stretching
                }}
              />
            </div>
          </div>

          {/* Partner 2 */}
          <div className="d-flex justify-content-center align-items-center pb-5">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "100%",
                height: "200px", // Fix a height for consistency
                maxWidth: "200px", // Max width for image container
              }}
            >
              <Image
                src={logo2}
                alt="logo"
                fluid
                style={{
                  objectFit: "contain", // Maintain aspect ratio without stretching
                }}
              />
            </div>
          </div>

          {/* Partner 3 */}
          <div className="d-flex justify-content-center align-items-center pb-5">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "100%",
                height: "200px", // Fix a height for consistency
                maxWidth: "200px", // Max width for image container
              }}
            >
              <Image
                src={logo1}
                alt="logo"
                fluid
                style={{
                  objectFit: "contain", // Maintain aspect ratio without stretching
                }}
              />
            </div>
          </div>

          {/* Partner 4 */}
          <div className="d-flex justify-content-center align-items-center pb-5">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "100%",
                height: "200px", // Fix a height for consistency
                maxWidth: "200px", // Max width for image container
              }}
            >
              <Image
                src={logo2}
                alt="logo"
                fluid
                style={{
                  objectFit: "contain", // Maintain aspect ratio without stretching
                }}
              />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default OurPartners;
