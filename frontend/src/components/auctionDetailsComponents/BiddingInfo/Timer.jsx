import { Container, Row, Col, Stack } from "react-bootstrap";
import FlipCountdown from "@rumess/react-flip-countdown";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
function Timer({auction}) {

  const updatedData = {
<<<<<<< Updated upstream
    AuctionStatus:"Closed",
    title:auction.title ,
=======
    AuctionStatus: "Ended",
    title: auction.title,
>>>>>>> Stashed changes
    description: auction.description,
    images: auction.images,
    StartingBid: auction.startingBid,
    ReservePrice: auction.reservePrice,
    StartingTime: auction.startingTime,
    EndingTime: auction.endingTime,
    Address:  auction.address,
    condition: auction.condition,
    quantity: auction.quantity,
    CategoryId: auction.category.categoryId,
  };

 console.log(auction.data);
  const handleTimeUp = async () => {
    const formData = new FormData();
<<<<<<< Updated upstream
Object.entries(updatedData).forEach(([key, value]) => {
  formData.append(key, value);
});
    try {
      // Example PUT request to update auction status
      const response = await axios.put(
        `http://localhost:5125/api/auction/${auction.auctionId}`,formData,
        {headers: {
          "Content-Type": "multipart/form-data",
        },}
=======
    Object.entries(updatedData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(updatedData);
    console.log(auction.CategoryId);
    try {
      // Example PUT request to update auction status
      const response = await axios.put(
        `http://localhost:5192/api/auction/${auction.auctionId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
>>>>>>> Stashed changes
      );

      Swal.fire({
        title: "Auction Closed!",
        text: "The auction has ended and is now closed.",
        icon: "success",
      });

      console.log("Auction closed successfully:", response.data);
    } catch (error) {
      console.error("Error closing auction:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to close the auction. Please try again.",
        icon: "error",
      });
    }
  };
  var time;
  if(auction.AuctionStatus=="Approved") time=auction.startingTime;
  if(auction.AuctionStatus=="Started") time=auction.endingTime;
  return (
    
    <Container fluid>
      <Row className="justify-content-between p-2  align-items-center bg-secondary bg-opacity-50 text-center text-primary-emphasis rounded-3">
        <FlipCountdown
          endAt={auction.endingTime}
          size="small"
          titlePosition="top"
          hideYear
          hideMonth
          dayTitle="Days"
          hourTitle="Hours"
          minuteTitle="Mins"
          secondTitle="Secs"
          onTimeUp={handleTimeUp}
        />
      </Row>
    </Container>
  );
}
export default Timer;
