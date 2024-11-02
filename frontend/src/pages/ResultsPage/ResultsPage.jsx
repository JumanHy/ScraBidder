import { Container, Row, Col } from "react-bootstrap";
import AuctionCard from "@/components/AuctionCard/AuctionCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import Filters from "@/components/resultsComponents/Filters/Filters";

function ResultsPage() {
  return (
    <Container fluid>
      <Row className="justify-content-center gap-3">
        <Row className="justify-content-center">
          <SearchBar />
        </Row>
        <Row className="gap-3 gap-md-0">
          <Col xs={12} md={4} lg={3}>
            <Filters />
          </Col>
          <Col xs={12} md={8} lg={9}>
            <Row className="justify-content-between g-3">
              {Array.from({ length: 24 }).map((_, index) => (
                <Col key={index} xs={12} sm={6} lg={4}>
                  <AuctionCard />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default ResultsPage;
