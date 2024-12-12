import { Container, Row } from "react-bootstrap";
import FlipCountdown from "@rumess/react-flip-countdown";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Timer({ auction, status, setStatus }) {
  const [endTime, setEndTime] = useState(
    status == "Approved" ? auction.startingTime : auction.endingTime
  );
  const [counterKey, setCounterKey] = useState(Date.now());
  useEffect(() => {
    if (status == "Started") {
      setEndTime(auction.endingTime);
      setCounterKey(Date.now());
    }
  }, [status]);

  const handleStatusUpdate = async (newStatus) => {
    const updatedData = {
      AuctionStatus: newStatus,
      title: auction.title,
      description: auction.description,
      images: auction.images,
      StartingBid: auction.startingBid,
      ReservePrice: auction.reservePrice,
      StartingTime: auction.startingTime,
      EndingTime: auction.endingTime,
      Address: auction.address,
      condition: auction.condition,
      quantity: auction.quantity,
      CategoryId: auction.category.categoryId,
    };

    const formData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.put(
        `http://localhost:5192/api/auction/${auction.auctionId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(`Auction status updated to ${newStatus}:`, response.data);
    } catch (error) {
      console.error("Error updating auction status:", error);
    }
  };

  const handleTimeUp = () => {
    if (status == "Approved") {
      // Transition from "Approved" to "Started"
      setStatus("Started");
      handleStatusUpdate("Started");
    } else if (status == "Started") {
      // Transition from "Started" to "Ended"
      setStatus("Ended");
      handleStatusUpdate("Ended");
      localStorage.removeItem(`${auction.auctionId}_deposit`);
      Swal.fire({
        title: "Auction Closed!",
        text: "The auction has ended and is now closed.",
        icon: "success",
      });
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-between p-2 align-items-center bg-secondary bg-opacity-50 text-center text-primary-emphasis rounded-3">
        <FlipCountdown
          key={counterKey}
          endAt={endTime} // Dynamic end time based on auction status
          size="small"
          titlePosition="top"
          hideYear
          hideMonth
          dayTitle="Days"
          hourTitle="Hours"
          minuteTitle="Mins"
          secondTitle="Secs"
          onTimeUp={handleTimeUp} // Handle time up to transition states
        />
      </Row>
    </Container>
  );
}

export default Timer;
