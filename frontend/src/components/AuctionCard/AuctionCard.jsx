import { Card, Button } from "react-bootstrap";
import FlipCountdown from "@rumess/react-flip-countdown";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";

function AuctionCard({ currentAuction }) {
  const [status, setStatus] = useState(currentAuction.auctionStatus);

  const [countdownKey, setCountdownKey] = useState(Date.now()); // Unique key for FlipCountdown

  useEffect(() => {
    setCountdownKey(Date.now());
  }, [status]);

  const handleTimeUp = () => {
    if (status === "Approved") {
      setStatus("Started");
    } else if (status === "Started") {
      setStatus("Ended");
    }
  };

  const endTime = new Date(currentAuction.endingTime);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(endTime);

  if (!currentAuction) {
    return null; // Handle case when currentAuction is not passed or is empty
  }

  const baseURL = "/src/assets/images/";
  const images = JSON.parse(currentAuction.images || "{}");
  const firstImage = baseURL + images.path1;

  return (
    <Card className="shadow border-0 h-100 rounded-4 text-primary">
      {/* Auction Image */}
      <Card.Img
        src={firstImage}
        fluid
        alt={currentAuction.title || "Auction Image"}
        className="rounded-top-4 w-100 object-fit-cover"
        style={{ maxHeight: "200px" }}
      />

      <Card.Body className="d-flex flex-column gap-2 justify-content-between align-items-center">
        {/* Auction Title */}
        <Card.Title className="text-primary fw-bold text-center">
          {currentAuction.title}
        </Card.Title>

        {/* Auction Ending Text */}
        {status === "Started" && (
          <div className="text-center">
            <Card.Subtitle className="text-secondary fw-bold text-uppercase">
              Ends After
            </Card.Subtitle>

            {/* Countdown Timer */}
            <div>
              <FlipCountdown
                key={countdownKey} // Force re-render on key change
                endAt={currentAuction.endingTime}
                size="small"
                titlePosition="top"
                hideYear
                hideMonth
                dayTitle="Days"
                hourTitle="Hours"
                minuteTitle="Mins"
                secondTitle="Secs"
                onTimeUp={handleTimeUp} // Handle time up
              />
            </div>
          </div>
        )}

        {status === "Approved" && (
          <div className="text-center">
            <Card.Subtitle className="text-secondary fw-bold text-uppercase">
              Starts After
            </Card.Subtitle>

            {/* Countdown Timer */}
            <div>
              <FlipCountdown
                key={countdownKey} // Force re-render on key change
                endAt={currentAuction.startingTime}
                size="small"
                titlePosition="top"
                hideYear
                hideMonth
                dayTitle="Days"
                hourTitle="Hours"
                minuteTitle="Mins"
                secondTitle="Secs"
                onTimeUp={handleTimeUp} // Handle time up
              />
            </div>
          </div>
        )}

        {status === "Ended" && (
          <div className="text-center">
            <Card.Subtitle className="text-secondary fw-bold text-uppercase">
              Ended At
            </Card.Subtitle>

            <div className="text-danger">{formattedDate}</div>
          </div>
        )}

        {/* Starting Bid */}
        {status === "Started" && (
          <Card.Text className="text-secondary fw-bold text-uppercase">
            Current Bid:
            {currentAuction.currentBid == null
              ? " -"
              : currentAuction.currentBid}{" "}
            JD
          </Card.Text>
        )}

        {status === "Ended" && (
          <Card.Text className="text-secondary fw-bold text-uppercase">
            Final Price: {currentAuction.currentBid} JD
          </Card.Text>
        )}

        {/* Bid Button */}
        <LinkContainer to={`/auction/${currentAuction.auctionId}`}>
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
