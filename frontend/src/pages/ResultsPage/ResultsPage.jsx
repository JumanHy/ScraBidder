import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import LiveSearchBar from "@/components/LiveSearchBar/LiveSearchBar";
import Filters from "@/components/resultsComponents/Filters/Filters";
import { useEffect, useState } from "react";
import AuctionCardsList from "@/components/AuctionCardsList/AuctionCardsList";
import Pager from "@/components/resultsComponents/Pager/Pager";
import axios from "axios";

function ResultsPage() {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    materialType: "",
    condition: "",
    quantity: "",
    auctionStatus: "",
  });

  const itemsPerPage = 24;

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://localhost:5192/api/auction")
      .then((response) => {
        setAuctions(response.data);
        setFilteredAuctions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching auctions:", err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 300000);

    return () => clearInterval(interval);
  }, []);

  const totalItems = filteredAuctions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAuctions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Unified filtering logic
  const applyFilters = () => {
    let filtered = [...auctions];

    // Apply active filters
    if (activeFilters.materialType) {
      const materialMapping = {
        Aluminum: 1,
        Copper: 2,
        Plastic: 3,
        Iron: 4,
        "Stainless Steel": 5,
        Wood: 6,
        Glass: 7,
        Paper: 8,
        Rubber: 9,
        Textile: 10,
        Ceramic: 11,
      };

      const categoryId = materialMapping[activeFilters.materialType];
      filtered = filtered.filter(
        (auction) => auction.category.categoryId === categoryId
      );
    }

    if (activeFilters.condition) {
      filtered = filtered.filter(
        (auction) => auction.condition === activeFilters.condition
      );
    }

    if (activeFilters.quantity) {
      filtered = filtered.filter(
        (auction) => auction.quantity >= Number(activeFilters.quantity)
      );
    }

    if (activeFilters.auctionStatus && activeFilters.auctionStatus !== "All") {
      filtered = filtered.filter(
        (auction) => auction.auctionStatus === activeFilters.auctionStatus
      );
    }

    // Apply live search term
    if (searchTerm) {
      filtered = filtered.filter((auction) =>
        auction.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAuctions(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    setActiveFilters(filters); // Update active filters
    setCurrentPage(1); // Reset to the first page
  };

  // Handle live search changes
  const handleSearchChange = (term) => {
    setSearchTerm(term); // Update the search term
    setCurrentPage(1); // Reset to the first page
  };

  // Reapply filters whenever `activeFilters` or `searchTerm` changes
  useEffect(() => {
    applyFilters();
  }, [activeFilters, searchTerm]);

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
          <LiveSearchBar onSearchChange={handleSearchChange} />
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
