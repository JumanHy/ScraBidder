import React, { useState } from "react";
import Slider from "react-slick";
import { Container, Row, Col, Image } from "react-bootstrap";

function ImagesSlider({ auction }) {
  // Define the base URL for your image paths using the '@' alias
  const baseURL = "/src/assets/images/";

  // Safely parse the auction.images string into an object
  let images = [];
  if (auction?.images) {
    try {
      const imageObject = JSON.parse(auction.images); // Parse the string into an object
      images = Object.values(imageObject).map((path) => `${baseURL}${path}`);
      console.log("Parsed image paths:", images);
    } catch (error) {
      console.error("Failed to parse auction images:", error);
    }
  }

  console.log("Image URLs:", images);
  const [mainSlider, setMainSlider] = useState(null);
  const [thumbnailSlider, setThumbnailSlider] = useState(null);

  const mainSettings = {
    asNavFor: thumbnailSlider,
    ref: (slider) => setMainSlider(slider),
    arrows: false,
  };

  const thumbnailSettings = {
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    asNavFor: mainSlider,
    ref: (slider) => setThumbnailSlider(slider),
    centerMode: true,
    centerPadding: "50px",
    arrows: false,
  };

  return (
    <Container>
      <Row className="justify-content-center">
        {/* Main Image Slider */}
        <Col xs={12} className="position-relative p-0">
          <Slider {...mainSettings}>
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image}
                    alt={`Main ${index}`}
                    className="w-100"
                    style={{
                      maxHeight: "400px",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </div>
              ))
            ) : (
              <div>No images available</div>
            )}
          </Slider>
        </Col>
      </Row>

      {/* Thumbnail Slider */}
      <Row className="justify-content-center mt-3">
        <Col xs={12}>
          <Slider {...thumbnailSettings}>
            {images.map((image, index) => (
              <div key={index} className="p-1">
                <Image
                  src={image}
                  alt={`Thumbnail ${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
    </Container>
  );
}

export default ImagesSlider;
