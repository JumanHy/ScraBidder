import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import SearchBar from "@/components/SearchBar/SearchBar";
import Filters from "@/components/resultsComponents/Filters/Filters";
import { useEffect, useState } from "react";
import AuctionCardsList from "@/components/AuctionCardsList/AuctionCardsList";
import Pager from "@/components/resultsComponents/Pager/Pager";
import axios from "axios";

function ResultsPage() {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 24; // Show 24 AuctionCards per page

  useEffect(() => {
    axios
      .get("http://localhost:5192/api/auction") // Replace with your endpoint
      .then((response) => {
        const data = response.data;

        setAuctions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching auctions:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const totalItems = auctions.length; // Total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the current items based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = auctions.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="pt-5">
        <Alert variant="danger">
          Failed to load auctions. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="pt-2">
      <Row className="justify-content-center gap-3">
        <Row className="justify-content-center">
          <SearchBar />
        </Row>
        <Row className="gap-3 gap-md-0">
          <Col xs={12} md={4} lg={3}>
            <Filters />
          </Col>
          <Col xs={12} md={8} lg={9}>
            <AuctionCardsList currentItems={currentItems} />
            <Row className="justify-content-center align-items-center mt-4">
              <Col xs={"auto"}>
                <Pager
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default ResultsPage;
