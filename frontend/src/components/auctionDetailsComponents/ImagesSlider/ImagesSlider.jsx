import React, { useState } from "react";
import Slider from "react-slick";
import { Container, Row, Col, Image } from "react-bootstrap";

function ImagesSlider() {
  const images = [
    "https://placehold.co/600x400",
    "https://placehold.co/600x400?text=Image+2",
    "https://placehold.co/600x400?text=Image+3",
    "https://placehold.co/600x400?text=Image+4",
    "https://placehold.co/600x400?text=Image+5",
    "https://placehold.co/600x400?text=Image+6",
  ];

  const [mainSlider, setMainSlider] = useState(null);
  const [thumbnailSlider, setThumbnailSlider] = useState(null);

  const mainSettings = {
    asNavFor: thumbnailSlider,
    ref: (slider) => setMainSlider(slider),
  };

  const thumbnailSettings = {
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    asNavFor: mainSlider,
    ref: (slider) => setThumbnailSlider(slider),
    centerMode: true,
    centerPadding: "50px",
  };

  return (
    <Container>
      <Row className="justify-content-center">
        {/* Main Image Slider */}
        <Col xs={12} className="position-relative p-0">
          <Slider {...mainSettings}>
            {images.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={`Main ${index}`}
                  className="w-100 "
                  style={{
                    maxHeight: "400px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}
          </Slider>
          {/* Custom Arrows
          <ChevronLeft
            size={30}
            onClick={() => mainSlider.slickPrev()}
            className="position-absolute top-50 start-0 translate-middle-y"
            style={{ cursor: "pointer", color: "#333" }}
          />
          <ChevronRight
            size={30}
            onClick={() => mainSlider.slickNext()}
            className="position-absolute top-50 end-0 translate-middle-y"
            style={{ cursor: "pointer", color: "#333" }}
          /> */}
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
