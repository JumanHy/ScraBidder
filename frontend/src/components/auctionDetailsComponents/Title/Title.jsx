import { LinkContainer } from "react-router-bootstrap";
export default function Title() {
  return (
    <>
      <h1 className="text-primary">auction title</h1>
      <h6 className="text-primary">
        Created By
        <LinkContainer to="/cprofile" style={{ cursor: "pointer" }}>
          <span className="text-info ps-1">Company Name</span>
        </LinkContainer>
      </h6>
    </>
  );
}
