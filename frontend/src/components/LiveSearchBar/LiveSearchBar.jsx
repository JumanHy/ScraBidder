import { InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";

function LiveSearchBar({ onSearchChange }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value); // Notify parent of the updated search term
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
        onChange={handleInputChange}
      />
    </InputGroup>
  );
}

export default LiveSearchBar;
