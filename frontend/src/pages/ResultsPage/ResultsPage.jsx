// ResultsPage.js
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "@/components/SearchBar/SearchBar";
import Filters from "@/components/resultsComponents/Filters/Filters";
import { useEffect, useState } from "react";
import AuctionCardsList from "@/components/AuctionCardsList/AuctionCardsList";
import Pager from "@/components/resultsComponents/Pager/Pager";
import axios from "axios";

function ResultsPage() {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]); // For filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
<<<<<<< Updated upstream
    // Define multiple API requests
    const fetchAuctions = axios.get('http://localhost:5125/api/auction'); // Replace with your endpoint

    // Use Promise.all to wait for all requests to complete
    Promise.all([fetchAuctions])
      .then(([auctionsResponse]) => {
        // Update states with data from each API
        setAuctions(auctionsResponse.data); // Assuming auctionsResponse.data contains the auctions array
=======
    axios
      .get("http://localhost:5192/api/auction", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAuctions(response.data);
        setFilteredAuctions(response.data); // Initialize filtered auctions
>>>>>>> Stashed changes
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  }, []);
<<<<<<< Updated upstream
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // Show 24 AuctionCards per page
  const totalItems = auctions.length; // Total number of items
=======

  const totalItems = filteredAuctions.length; // Total number of items after filtering
>>>>>>> Stashed changes
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the current items based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
<<<<<<< Updated upstream
  const currentItems = Array.from({ length: totalItems }).slice(
    indexOfFirstItem,
    indexOfLastItem
  );
=======
  const currentItems = filteredAuctions.slice(indexOfFirstItem, indexOfLastItem);
>>>>>>> Stashed changes

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

<<<<<<< Updated upstream
=======
  // Handle filtering from Filters component
  const handleFilterChange = (filteredData) => {
    setFilteredAuctions(filteredData);
    setCurrentPage(1); // Reset to first page on new filter
  };

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

>>>>>>> Stashed changes
  return (
    <Container fluid className="pt-2">
      <Row className="justify-content-center gap-3">
        <Row className="justify-content-center">
          <SearchBar />
        </Row>
        <Row className="gap-3 gap-md-0">
          <Col xs={12} md={4} lg={3}>
            <Filters auctions={auctions} onFilterChange={handleFilterChange} />
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
