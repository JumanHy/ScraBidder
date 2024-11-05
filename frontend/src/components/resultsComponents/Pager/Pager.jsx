import { Pagination } from "react-bootstrap";

function Pager({ currentPage, totalPages, onPageChange }) {
  const renderPaginationItems = () => {
    const paginationItems = [];

    // Display "First" and "Previous" buttons
    if (currentPage > 1) {
      paginationItems.push(
        <Pagination.First key="first" onClick={() => onPageChange(1)} />
      );
      paginationItems.push(
        <Pagination.Prev
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
        />
      );
    }

    // Define the range of visible pages (two before and two after the current page)
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Display page numbers within the range
    for (let page = startPage; page <= endPage; page++) {
      paginationItems.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    // Display "Next" and "Last" buttons
    if (currentPage < totalPages) {
      paginationItems.push(
        <Pagination.Next
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
        />
      );
      paginationItems.push(
        <Pagination.Last key="last" onClick={() => onPageChange(totalPages)} />
      );
    }

    return paginationItems;
  };

  return <Pagination>{renderPaginationItems()}</Pagination>;
}

export default Pager;
