import { LinkContainer } from "react-router-bootstrap";
export default function Title({ auctionTitle, company }) {
  return (
    <>
      <h1 className="text-primary">{auctionTitle}</h1>
      <h6 className="text-primary">
        Created By
        <LinkContainer
          to={`/cprofile/${company.sellerId}`}
          style={{ cursor: "pointer" }}
        >
          <span className="text-info ps-1">{company.businessName}</span>
        </LinkContainer>
      </h6>
    </>
  );
}
