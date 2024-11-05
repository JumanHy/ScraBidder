import { Container, Row, Col } from "react-bootstrap";
import Title from "@/components/auctionDetailsComponents/Title/Title";
import ImagesSlider from "@/components/auctionDetailsComponents/ImagesSlider/ImagesSlider";
import BiddingInfo from "@/components/auctionDetailsComponents/BiddingInfo/BiddingInfo";
import Description from "@/components/auctionDetailsComponents/Description/Description";
import Details from "@/components/auctionDetailsComponents/Details/Details";
import Location from "@/components/auctionDetailsComponents/Location/Location";
function AuctionDetailsPage() {
  return (
    <Container>
      <Row>
        <Title />
      </Row>

      <Row>
        <Col xs={12} md={7} className="">
          <ImagesSlider />
        </Col>

        <Col xs={12} md={5} className="mt-md-0  mt-2">
          <BiddingInfo />
        </Col>
      </Row>
      <Row className="mt-3 gap-2 gap-md-0">
        <Col xs={{ span: 12, order: "last" }} md={{ span: 7, order: "first" }}>
          <Description />
        </Col>
        <Col xs={12} md={5}>
          <Details />
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
