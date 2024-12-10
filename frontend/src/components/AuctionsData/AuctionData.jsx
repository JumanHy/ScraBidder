import "./style.css";
import { React, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Form,
  Image,
  Dropdown,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import scrap from "../../assets/images/scrap.png";
import axios from "axios";
import { Trash3 } from "react-bootstrap-icons";

function AuctionData({ auctions, BiddingHistory }) {
  const [records, setRecords] = useState([]);
  const [bidRecords, setBidRecords] = useState(auctions.biddings);

  console.log(BiddingHistory);

  useEffect(() => {
    if (auctions && auctions.length > 0) {
      setRecords(auctions);
    }
  }, [auctions]);

  useEffect(() => {
    if (BiddingHistory && BiddingHistory.length > 0) {
      setBidRecords(BiddingHistory);
    }
  }, [BiddingHistory]);

  useEffect(() => {
    const checkAuctionsStatus = () => {
      const currentTime = new Date();

      auctions.forEach((auction) => {
        const auctionStartTime = new Date(auction.startingTime); // Ensure startingTime is properly parsed
        if (
          auction.auctionStatus.toLowerCase() === "Pending" &&
          auctionStartTime <= currentTime
        ) {
          // Update auction status to "Started"
          axios
            .put(`http://localhost:5192/api/auction/${auction.auctionId}`, {
              ...auction,
              auctionStatus: "Started",
            })
            .then((response) => {
              console.log(`Auction ${auction.id} started successfully`);
              // Update the local state
              setAuctions((prevAuctions) =>
                prevAuctions.map((a) =>
                  a.id === auction.id ? { ...a, auctionStatus: "Started" } : a
                )
              );
            })
            .catch((error) => {
              console.error(`Error starting auction ${auction.id}:`, error);
            });
        }
      });
    };

    // Set an interval to check every minute (60000 ms)
    const intervalId = setInterval(() => {
      checkAuctionsStatus();
    }, 60000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [auctions]); // Dependency array includes auctions

  const columns = [
    {
      name: "ID",
      width: "100px",
      selector: (row) => row.auctionId,
      sortable: true,
    },
    {
      name: "Auction Title",
      width: "200px",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => <div className="text-primary fw-bold">{row.title}</div>,
    },
    {
      name: "Seller",
      selector: (row) => row.seller.businessName,
      sortable: true,
      wrap: true,
    },
    {
      name: "Start Date",
      selector: (row) => new Date(row.startingTime).toLocaleString(),
      sortable: true,
      wrap: true,
    },
    {
      name: "End Date",
      selector: (row) => new Date(row.endingTime).toLocaleString(),
      sortable: true,
      wrap: true,
    },
    {
      name: "Category",
      width: "150px",
      selector: (row) => row.category.categoryName,
      sortable: true,
    },
    {
      name: "Status",
      width: "250px",
      selector: (row) => row.auctionStatus,
      sortable: true,
      cell: (row) => {
        const colorMap = {
          Started: "green",
          Pending: "orange",
          Ended: "grey",
          Approved: "blue",
          Denied: "red",
        };

        return (
          <div className="d-flex justify-content-between align-items-center">
            {/* Status text aligned to the start */}
            <span
              className="flex-grow-1"
              style={{
                color: colorMap[row.auctionStatus] || "black",
                fontWeight: "bold",
              }}
            >
              {row.auctionStatus}
            </span>

            {/* Accept/Deny buttons for 'Pending' status */}
            {row.auctionStatus.toLowerCase() === "pending" ? (
              <div className="d-flex">
                <Button
                  variant="success"
                  size="sm"
                  className="ms-2"
                  onClick={() =>
                    handleAcceptDenyAuction(row.auctionId, "Approved")
                  }
                >
                  Accept
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() =>
                    handleAcceptDenyAuction(row.auctionId, "Denied")
                  }
                >
                  Deny
                </Button>
              </div>
            ) : (
              /* Trash icon for non-pending and non-deleted statuses */
              row.auctionStatus.toLowerCase() !== "deleted" && (
                <Trash3
                  size={16}
                  color="red"
                  className="ms-2 cursor-pointer"
                  onClick={() =>
                    handleAcceptDenyAuction(row.auctionId, "Deleted")
                  }
                />
              )
            )}
          </div>
        );
      },
    },
  ];

  const bidColumns = [
    {
      name: "ID",
      width: "100px",
      selector: (row) => row.bidId,
      sortable: true,
      wrap: true,
    },
    {
      name: "Bidder Name",
      selector: (row) => row.bidder.bidderName,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <div className="text-primary fw-bold">{row.bidder.bidderName}</div>
      ),
    },
    {
      name: "Bid Amount(JOD)",
      selector: (row) => row.bidAmount,
      sortable: true,
    },
    {
      name: "Bid Time",
      selector: (row) => row.bidTime,
      sortable: true,
      wrap: true,
    },
    {
      name: "Auction ID",
      selector: (row) => row.auction.auctionId,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <div className="text-primary fw-bold">{row.auction.auctionId}</div>
      ),
    },
  ];

  const handleAcceptDenyAuction = async (auctionId, status) => {
    try {
      // Step 1: Fetch the auction details
      const response = await axios.get(
        `http://localhost:5192/api/auction/${auctionId}`
      );
      const auction = response.data;
      const updatedData = {
        AuctionStatus: status,
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
      // Step 2: Update the auctionStatus and make a PUT request
      await axios.put(
        `http://localhost:5192/api/auction/${auctionId}`,
        formData, // Spread the existing data and update auctionStatus
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure proper headers
          },
        }
      );
    } catch (error) {
      console.error("Error accepting the auction:", error);
      alert("Failed to accept the auction.");
    }
  };

  function handleBidFilter(event) {
    const newData = bidData.filter((row) => {
      return row.name
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase());
    });
    setBidRecords(newData);
  }
  function handleAuctionFilter(event) {
    const filterValue = event.target.value.toLowerCase(); // Ensure case-insensitivity if needed
    const newData = auctions.filter((row) => {
      return String(row.auctionId).toLowerCase().includes(filterValue);
    });
    setRecords(newData);
  }
  function handleStatusFilter(event) {
    const newData = auctions.filter((row) => {
      return row.auctionStatus.toLowerCase() === event.toLowerCase();
    });
    setRecords(newData);
  }

  function handleCategoryFilter(event) {
    const newData = auctions.filter((row) => {
      return row.category.categoryName === event;
    });
    setRecords(newData);
  }
  return (
    <>
      <Row className="justify-content-between px-2 pt-2">
        <Col xs={12} sm={6} md={3} className="mt-4">
          <span style={{ color: "#666666" }} className="me-2">
            start/end date
          </span>
          <Form.Control type="date" className="rounded-5" />
        </Col>

        <Col xs={12} sm={6} md={3} className="mt-5">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              className="w-75"
              style={{ backgroundColor: "#E6E6E6", fontSize: "15px" }}
            >
              auction status
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => setRecords(auctions)}>
                All
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleStatusFilter("Started")}
              >
                Started
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleStatusFilter("Pending")}
              >
                Pending
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleStatusFilter("Ended")}
              >
                Ended
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleStatusFilter("Approved")}
              >
                Approved
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleStatusFilter("Denied")}
              >
                Denied
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col xs={12} sm={6} md={3} className="mt-5">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              className="w-75"
              style={{ backgroundColor: "#E6E6E6", fontSize: "15px" }}
            >
              auction category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => setRecords(auctions)}>
                All
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleCategoryFilter("Aluminum")}
              >
                Aluminum
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleCategoryFilter("Copper")}
              >
                Copper
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleCategoryFilter("Plastic")}
              >
                Plastic
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleCategoryFilter("Iron")}
              >
                Iron
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleCategoryFilter("Stainless Steel")}
              >
                Stainless Steel
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleCategoryFilter("Wood")}
              >
                Wood
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleCategoryFilter("Glass")}
              >
                Glass
              </Dropdown.Item>
              <Dropdown.Item
                href="#"
                onClick={() => handleCategoryFilter("Paper")}
              >
                Paper
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <div className="m-5">
        <Row className="justify-content-between mb-4">
          <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
            <div
              className="d-flex align-items-center bg-white rounded-5 border border-black px-2"
              style={{
                maxWidth: "100%",
                borderColor: "#003A70",
                height: "40px",
              }}
            >
              <Form.Control
                type="text"
                placeholder="Search by auction ID"
                className="border-0 w-100"
                style={{ outline: "none" }}
                onChange={handleAuctionFilter}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
                color="black"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>
          </Col>
        </Row>

        <DataTable
          columns={columns}
          data={records}
          selectableRows
          fixedHeader
          pagination
          responsive
          striped
          highlightOnHover
          selectableRowsHighlight
          customStyles={{
            rows: {
              style: {
                fontSize: "16px",
                borderRadius: "0 0 10px 10px",
              },
            },

            headCells: {
              style: {
                backgroundColor: "#003A70",
                color: "white",
                fontSize: "17px",
                fontWeight: "bold",
                borderRadius: "10px 10px 0 0",
              },
            },
          }}
        />
      </div>

      <div style={{ height: "100px" }}></div>

      <div className="mb-3">
        <h2 className="text-center mb-3" style={{ color: "#003a70" }}>
          Bidding History
        </h2>

        <div
          className="col-12 d-flex p-2 m-3 bg-white rounded-5 justify-content-between border border-black "
          style={{
            maxWidth: "250px",
            height: "40px",
            borderColor: "#003A70",
          }}
        >
          <input
            type="text"
            placeholder="Search by auction ID"
            className="w-100 border-0 "
            style={{
              outline: "none",
            }}
            onChange={handleBidFilter}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
            color="black"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>

        <DataTable
          columns={bidColumns}
          data={bidRecords}
          selectableRows
          fixedHeader
          pagination
          responsive
          striped
          highlightOnHover
          selectableRowsHighlight
          customStyles={{
            rows: {
              style: {
                fontSize: "16px",
                borderRadius: "0 0 10px 10px",
              },
            },
            headCells: {
              style: {
                backgroundColor: "#003A70",
                color: "white",
                fontSize: "17px",
                fontWeight: "bold",
                borderRadius: "10px 10px 0 0",
              },
            },
          }}
        ></DataTable>
      </div>
    </>
  );
}
export default AuctionData;
