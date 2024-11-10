import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { Hammer, Person, CurrencyDollar } from "react-bootstrap-icons";
import Chart1 from "../Chart/Chart";
import { Chart } from "react-google-charts";
import LineChart from "../Chart/LineChart";

function Stats() {
  const data = [
    ["Task", "Hours per Day"],
    ["Aluminum", 9],
    ["Copper", 2],
    ["Stainless Steel", 2],
    ["Rubber", 2],
    ["Iron", 7],
  ];

  const options = {
    title: "Sales Over Categories",
    colors: ["#003A70", "#B87333"],
  };

  return (
    <>
      <div className="pb-3 border-bottom mb-5">
        <h2 className="text-center pt-3" style={{ color: "#003a70" }}>
          Statistics Overview
        </h2>
        <div className="w-50 w-md-25 mx-auto mb-3">
          <span style={{ color: "#666666" }} className="me-2">Date Range</span>
          <Form.Control type="date" className="rounded-4" />
        </div>
        <Container fluid>
          <Row className="justify-content-center">
            {[
              { label: "Total Auctions", icon: <Hammer size={25} color="#B87333" />, value: 233 },
              { label: "New Users", icon: <Person size={25} color="#B87333" />, value: 450 },
              { label: "Active Users", icon: <Person size={25} color="#B87333" />, value: 10 },
              { label: "Sold Auctions", icon: <Hammer size={25} color="#B87333" />, value: 112 },
              { label: "Revenue Generated", icon: <CurrencyDollar size={25} color="#B87333" />, value: "13426.5 JOD" },
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
                  <span className="ps-3" style={{ color: "#666666" }}>{item.label}</span>
                </div>
                <div className="fs-3 pb-2 fw-bold" style={{ color: "#003A70" }}>{item.value}</div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <Container fluid className="d-flex flex-wrap justify-content-between">
        <Col xs={12} lg={6}>
          <h2 className="text-center pt-3" style={{ color: "#003a70" }}>Auction Volume</h2>
          <div className="w-50 w-md-25 mx-auto">
            <span style={{ color: "#666666" }} className="me-2">Date Range</span>
            <Form.Control type="date" className="rounded-4" />
          </div>
          <Row className="justify-content-center">
            <Col xs={11} md={10} lg={8} className="shadow py-5 my-5">
              <Chart1 />
            </Col>
          </Row>
        </Col>

        <Col xs={12} lg={6}>
          <h2 className="text-center pt-3" style={{ color: "#003a70" }}>User Growth</h2>
          <div className="w-50 w-md-25 mx-auto">
            <span style={{ color: "#666666" }} className="me-2">Date Range</span>
            <Form.Control type="date" className="rounded-4" />
          </div>
          <Row className="justify-content-center">
            <Col xs={11} md={10} lg={8} className="shadow py-5 my-5">
              <LineChart />
            </Col>
          </Row>
        </Col>
      </Container>

      <div>
        <h2 className="text-center py-3" style={{ color: "#003a70" }}>Revenue Generated</h2>
        <div className="w-50 w-md-25 mx-auto">
          <span style={{ color: "#666666" }} className="me-2">Date Range</span>
          <Form.Control type="date" className="rounded-4" />
        </div>

        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={4} className="d-flex justify-content-center m-5">
              <div className="m-3" style={{ maxWidth: "500px", width: "100%" }}>
                <div className="d-flex justify-content-between text-center shadow rounded p-4 my-5" style={{ color: "#003A70" }}>
                  <h3>Cumulative Sales Value</h3>
                  <h3>100,000 JOD</h3>
                </div>
                <div className="d-flex justify-content-between text-center shadow rounded px-4 py-5 my-5" style={{ color: "#B87333" }}>
                  <h3>Earnings</h3>
                  <h3>10,000 JOD</h3>
                </div>
              </div>
            </Col>

            <Col xs={12} md={6} lg={6} className="d-flex justify-content-center mx-3 my-5">
              <div className="shadow w-100" style={{ maxWidth: "600px" }}>
                <Chart
                  chartType="PieChart"
                  data={data}
                  options={options}
                  width={"100%"}
                  height={"500px"}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Stats;
