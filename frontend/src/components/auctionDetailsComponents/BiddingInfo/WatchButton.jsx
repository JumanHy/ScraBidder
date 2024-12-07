import { useState, useEffect } from "react";
import { Button, Stack } from "react-bootstrap";
import { Eye, EyeFill } from "react-bootstrap-icons";
import axios from "axios";

function WatchButton({ auctionId }) {
  const [isInWatchList, setIsInWatchList] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  // Function to check if auction is in the user's watchlist
  const checkIfInWatchList = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5192/api/watch-list/user/${userId}/auction/${auctionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );

      if (response.data.watchId) {
        setIsInWatchList(true); // Auction is in the watchlist
      } else {
        setIsInWatchList(false); // Auction is not in the watchlist
      }
    } catch (error) {
      console.error("Error fetching watchlist status:", error);
      // Handle error if necessary
    }
  };

  // Function to add an auction to the watchlist
  const addToWatchList = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5192/api/watch-list/auction/${auctionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Auction added to watchlist:", response.data);
      setIsInWatchList(true);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  // Function to remove an auction from the watchlist
  const removeFromWatchList = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5192/api/watch-list/auction/${auctionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Auction removed from watchlist:", response.data);
      setIsInWatchList(false);
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  // Toggle between adding/removing from the watchlist
  const toggleWatchList = () => {
    if (isInWatchList) {
      removeFromWatchList();
    } else {
      addToWatchList();
    }
  };

  // Check watchlist status when the component mounts
  useEffect(() => {
    checkIfInWatchList();
  }, [auctionId, userId]); // Dependency array to rerun when auctionId or userId changes

  return (
    <Button onClick={toggleWatchList} variant="light">
      <Stack direction="horizontal" className="gap-2">
        {isInWatchList ? (
          <EyeFill color="#003a70" size={24} />
        ) : (
          <Eye color="#003a70" size={24} />
        )}
        <span>{isInWatchList ? "Unwatch" : "Watch"}</span>
      </Stack>
    </Button>
  );
}

export default WatchButton;
