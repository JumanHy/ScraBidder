import { Container } from "react-bootstrap";
export default function Description({ auction }) {
  return (
    <Container fluid className="p-4 text-primary bg-primary-subtle">
      <h2>Auction Description</h2>
      <div>{auction.description}</div>
    </Container>
  );
}
