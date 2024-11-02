import { FaSearch } from "react-icons/fa";
import { InputGroup, FormControl, Button } from "react-bootstrap";
function SearchBar() {
  return (
    <InputGroup
      className="shadow-lg rounded-pill p-1 border border-primary"
      style={{
        maxWidth: "500px",
      }}
    >
      <FormControl
        placeholder="Search for scraps..."
        aria-label="Search"
        className="rounded-pill border-0"
      />
      <Button variant="primary" className="rounded-pill px-4">
        <FaSearch />
      </Button>
    </InputGroup>
  );
}

export default SearchBar;
