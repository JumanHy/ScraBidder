import { FaSearch } from "react-icons/fa";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <InputGroup
      className="shadow-lg rounded-pill p-1 bg-white border border-primary"
      style={{
        maxWidth: "500px",
      }}
    >
      <FormControl
        placeholder="Search for scraps..."
        aria-label="Search"
        className="rounded-pill border-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        variant="primary"
        className="rounded-pill px-4"
        onClick={handleSearch}
      >
        <FaSearch />
      </Button>
    </InputGroup>
  );
}

export default SearchBar;
