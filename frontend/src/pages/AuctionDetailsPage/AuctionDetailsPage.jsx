import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import Title from "@/components/auctionDetailsComponents/Title/Title";
import ImagesSlider from "@/components/auctionDetailsComponents/ImagesSlider/ImagesSlider";
import BiddingInfo from "@/components/auctionDetailsComponents/BiddingInfo/BiddingInfo";
import Description from "@/components/auctionDetailsComponents/Description/Description";
import Details from "@/components/auctionDetailsComponents/Details/Details";
import Location from "@/components/auctionDetailsComponents/Location/Location";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AuctionDetailsPage() {
  const { auctionId } = useParams(); // Get auctionId from URL

  const [auctionItem, setAuctionItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch auction details using the auctionId
    const fetchAuctionDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5192/api/auction/${auctionId}` // Replace with your API endpoint
        );
        const userId = localStorage.getItem("userId");

        // Check if the auction is restricted to the seller
        if (
          response.data.seller.sellerId !== userId && // Restrict if not the seller
          ["Pending", "Denied", "Deleted"].includes(response.data.auctionStatus)
        ) {
          setError("Failed to load auction details");
          return;
        }
        setAuctionItem(response.data);
        setStatus(response.data.auctionStatus);
      } catch (err) {
        setError("Failed to load auction details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctionDetails();
  }, []);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "100vh", textAlign: "center" }}
      >
        <Alert variant="danger" className="w-50">
          <h4 className="mb-3">Access Denied</h4>
          <p>{error}</p>
        </Alert>
        <Button variant="primary" onClick={() => navigate("/")}>
          Go Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Title auctionTitle={auctionItem.title} company={auctionItem.seller} />
      </Row>

      <Row>
        <Col xs={12} md={7} className="">
          <ImagesSlider auction={auctionItem} />
        </Col>

        <Col xs={12} md={5} className="mt-md-0 mt-2">
          <BiddingInfo
            currentItem={auctionItem}
            status={status}
            setStatus={setStatus}
          />
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
