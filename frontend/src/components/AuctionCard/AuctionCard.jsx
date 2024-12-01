import { Card, Button } from "react-bootstrap";
import FlipCountdown from "@rumess/react-flip-countdown";
import { LinkContainer } from "react-router-bootstrap";
function AuctionCard({currentAuction}) {
  console.log("helllo",currentAuction);
  return (
    <Card className="shadow border-0 h-100 rounded-4 text-primary">
      {/* Scrap Image */}
      <Card.Img
        src={"https://placehold.co/600x400"}
        fluid
        alt="Scrap"
        className="rounded-top-4 w-100 object-fit-cover"
        style={{
          maxHeight: "200px",
        }}
      />

      <Card.Body className="d-flex flex-column gap-2 justify-content-between align-items-center">
        {/* Scrap Title */}
        <Card.Title className="text-primary fw-bold text-center">
          {currentAuction.title}
        </Card.Title>

        {/* Auction Ending Text */}
        <div className="text-center">
          <Card.Subtitle className="text-secondary fw-bold text-uppercase">
            Ends After
          </Card.Subtitle>

          {/* Countdown Timer */}
          <div>
            <FlipCountdown
              endAt={currentAuction.endingTime}
              size="small"
              titlePosition="top"
              hideYear
              hideMonth
              dayTitle="Days"
              hourTitle="Hours"
              minuteTitle="Mins"
              secondTitle="Secs"
            />
          </div>
        </div>
        {/* Starting Bid Text */}
        <Card.Text className="text-secondary fw-bold text-uppercase">
          Starting Bid: {currentAuction.startingBid}
        </Card.Text>

        {/* Bid Button */}
        <LinkContainer 
        to={{
          pathname: "/auction",
        }}
        state={{ auctionItem: currentAuction }}
        >
          <div className="d-flex justify-content-center w-100">
            <Button
              variant="secondary"
              className="text-uppercase rounded-5 text-white fw-bold w-75"
            >
              Bid Now
            </Button>
          </div>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default AuctionCard;
