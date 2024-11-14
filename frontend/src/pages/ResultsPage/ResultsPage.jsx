// ResultsPage.js
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "@/components/SearchBar/SearchBar";
import Filters from "@/components/resultsComponents/Filters/Filters";
import { useState } from "react";
import AuctionCardsList from "@/components/AuctionCardsList/AuctionCardsList";
import Pager from "@/components/resultsComponents/Pager/Pager";

function ResultsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // Show 24 AuctionCards per page
  const totalItems = 346; // Total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the current items based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.from({ length: totalItems }).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
