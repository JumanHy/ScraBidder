import { Container, Row, Col, Spinner } from "react-bootstrap";
import Title from "@/components/auctionDetailsComponents/Title/Title";
import ImagesSlider from "@/components/auctionDetailsComponents/ImagesSlider/ImagesSlider";
import BiddingInfo from "@/components/auctionDetailsComponents/BiddingInfo/BiddingInfo";
import Description from "@/components/auctionDetailsComponents/Description/Description";
import Details from "@/components/auctionDetailsComponents/Details/Details";
import Location from "@/components/auctionDetailsComponents/Location/Location";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
function AuctionDetailsPage() {
  const location = useLocation();
  const auctionItem = location.state?.auctionItem;
  console.log(auctionItem.auctionId);
  return (
    <Container>
      <Row>
        <Title
          auctionTitle={auctionItem.title}
          companyName={auctionItem.seller.businessName}
        />
      </Row>

      <Row>
        <Col xs={12} md={7} className="">
          <ImagesSlider auction={auctionItem} />
        </Col>

        <Col xs={12} md={5} className="mt-md-0  mt-2">
          <BiddingInfo currentItem={auctionItem} />
        </Col>
      </Row>
      <Row className="mt-3 gap-2 gap-md-0">
        <Col xs={{ span: 12, order: "last" }} md={{ span: 7, order: "first" }}>
          <Description auction={auctionItem} />
        </Col>
        <Col xs={12} md={5}>
          <Details auction={auctionItem} />
        </Col>
      </Row>
      <Row className="mt-3 gap-2 gap-md-0">
        <Col xs={12}>
          <Location />
        </Col>
      </Row>
    </Container>
  );
}

export default AuctionDetailsPage;
