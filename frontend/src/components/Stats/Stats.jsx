import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import {
  Hammer,
  Person,
  AwardFill,
  PersonPlusFill,
  PersonFill,
} from "react-bootstrap-icons";
import LineChart from "../Chart/LineChart";
import { Chart } from "react-google-charts";
function Stats({ auctionsCount, soldAuctions }) {
  const data = [
    ["Task", "Hours per Day"],
    ["Aluminum", 1],
    ["Iron", 2],
    ["Plastic", 2],
    ["Copper", 2],
    ["Stainless Steel", 7],
  ];

  const options = {
    title: "Auctions Over Categories",
    colors: ["#003A70", "#B87333"],
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="pb-3 mb-5">
              <h2 className="text-center pt-3" style={{ color: "#003a70" }}>
                Statistics Overview
              </h2>
              <div className="w-50 w-md-25 mx-auto mb-3">
                <span style={{ color: "#666666" }} className="me-2">
                  Date Range
                </span>
                <Form.Control type="date" className="rounded-4" />
              </div>
              <Container fluid>
                <Row className="justify-content-center">
                  {[
                    {
                      label: "Total Auctions",
                      icon: <Hammer size={25} color="#B87333" />,
                      value: auctionsCount,
                    },
                    {
                      label: "New Users",
                      icon: <PersonPlusFill size={25} color="#B87333" />,
                      value: 450,
                    },
                    {
                      label: "Active Users",
                      icon: <PersonFill size={25} color="#B87333" />,
                      value: 10,
                    },
                    {
                      label: "Sold Auctions",
                      icon: <Hammer size={25} color="#B87333" />,
                      value: soldAuctions,
                    },
                    {
                      label: "Top Selling",
                      icon: <AwardFill size={25} color="#B87333" />,
                      value: "Iron",
                    },
                  ].map((item, idx) => (
                    <Col
                      key={idx}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      className="text-center shadow mx-2 my-3 rounded-3 card-animation"
                    >
                      <div className="fs-6 py-3">
                        {item.icon}
                        <span className="ps-3" style={{ color: "#666666" }}>
                          {item.label}
                        </span>
                      </div>
                      <div
                        className="fs-3 pb-2 fw-bold"
                        style={{ color: "#003A70" }}
                      >
                        {item.value}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </Col>
          <Col>
            <h2 className="text-center pt-3" style={{ color: "#003a70" }}>
              User Growth
            </h2>
            <div className="w-50 w-md-25 mx-auto">
              <span style={{ color: "#666666" }} className="me-2">
                Date Range
              </span>
              <Form.Control type="date" className="rounded-4" />
            </div>
            <Row className="justify-content-center">
              <Col xs={11} md={10} lg={8} className="shadow py-5 my-5">
                <LineChart />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="text-center pt-3" style={{ color: "#003a70" }}>
              Revenue Over Time
            </h2>
            <div className="w-50 w-md-25 mx-auto">
              <span style={{ color: "#666666" }} className="me-2">
                Date Range
              </span>
              <Form.Control type="date" className="rounded-4" />
            </div>
            <Row className="justify-content-center">
              <Col xs={11} md={10} lg={8} className="shadow py-5 my-5">
                <LineChart />
              </Col>
            </Row>
          </Col>
          <Col>
            <div>
              <h2 className="text-center py-3" style={{ color: "#003a70" }}>
                Auctions Over Categories
              </h2>
              <div className="text-center">
                <Container className="d-flex justify-content-evenly py-3">
                  <Col xs="auto">
                    <Button
                      style={{
                        backgroundColor: "#B87333",
                        borderColor: "#B87333",
                      }}
                      size="md"
                    >
                      Weekly
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button
                      style={{
                        backgroundColor: "#B87333",
                        borderColor: "#B87333",
                      }}
                      size="md"
                    >
                      Monthly
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button
                      style={{
                        backgroundColor: "#B87333",
                        borderColor: "#B87333",
                      }}
                      size="md"
                    >
                      Yearly
                    </Button>
                  </Col>
                </Container>
              </div>
            </div>
            <div
              className="shadow w-100 ms-5 mb-2"
              style={{ maxWidth: "500px" }}
            >
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Stats;
