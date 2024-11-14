import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  Person,
  Hammer,
  List,
  CurrencyDollar,
  Dot,
  CreditCard,
} from "react-bootstrap-icons";

function Feed() {
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to detect when the container comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("fade-container");
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Container
      id="fade-container"
      fluid
      className="col-12 py-2 rounded-4"
      style={{
        maxWidth: "500px",
        backgroundColor: "white",
        overflowY: "auto", // This enables vertical scrolling when content overflows
        maxHeight: "400px", // Set a maximum height for the container
      }}
    >
      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <CreditCard size={20} color="#B87333" />
          <span className="ms-3">Payment Received for Sold Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <Person size={20} color="#B87333" />
          <span className="ms-3">New User Registered</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <Hammer size={20} color="#B87333" />
          <span className="ms-3">Auction Closed and Item Sold</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <Hammer size={20} color="#B87333" />
          <span className="ms-3">Bid Placed on Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <List size={20} color="#B87333" />
          <span className="ms-3">New Auction Listed</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <CurrencyDollar size={20} color="#B87333" />
          <span className="ms-3">Bid Placed on Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>
      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <CreditCard size={20} color="#B87333" />
          <span className="ms-3">Payment Received for Sold Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>
      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <CreditCard size={20} color="#B87333" />
          <span className="ms-3">Payment Received for Sold Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <Person size={20} color="#B87333" />
          <span className="ms-3">New User Registered</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <Hammer size={20} color="#B87333" />
          <span className="ms-3">Auction Closed and Item Sold</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <Hammer size={20} color="#B87333" />
          <span className="ms-3">Bid Placed on Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <List size={20} color="#B87333" />
          <span className="ms-3">New Auction Listed</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <CurrencyDollar size={20} color="#B87333" />
          <span className="ms-3">Bid Placed on Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>
      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <CreditCard size={20} color="#B87333" />
          <span className="ms-3">Payment Received for Sold Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>
      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <CreditCard size={20} color="#B87333" />
          <span className="ms-3">Payment Received for Sold Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <Person size={20} color="#B87333" />
          <span className="ms-3">New User Registered</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <Hammer size={20} color="#B87333" />
          <span className="ms-3">Auction Closed and Item Sold</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <Hammer size={20} color="#B87333" />
          <span className="ms-3">Bid Placed on Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <List size={20} color="#B87333" />
          <span className="ms-3">New Auction Listed</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>

      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <CurrencyDollar size={20} color="#B87333" />
          <span className="ms-3">Bid Placed on Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>
      <div
        className={`d-flex justify-content-between p-2 m-3 shadow rounded-5 ${
          isVisible ? "fade-in" : ""
        }`}
      >
        <div>
          <CreditCard size={20} color="#B87333" />
          <span className="ms-3">Payment Received for Sold Auction</span>
        </div>
        <div>
          <Dot color="grey" />
          <span
            className="fst-italic font-weight-light fs-10"
            style={{ color: "#666666" }}
          >
            10 minutes ago
          </span>
        </div>
      </div>
    </Container>
  );
}

export default Feed;
