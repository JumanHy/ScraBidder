import "./style.css";
import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import {
  CurrencyDollar,
  PersonFill,
  QuestionCircle,
} from "react-bootstrap-icons";
import Chart1 from "../Chart/Chart";
import { Chart } from "react-google-charts";
import { Colors } from "chart.js";
import Feed from "./Feed";
function Overview() {
  const data = [
    ["Task", "Hours per Day"],
    ["Category 1", 9],
    ["Category 2", 2],
    ["Category 3", 2],
    ["Category 4", 2],
    ["Category 5", 7],
  ];

  const options = {
    title: "Sales Over Categories",
    colors: ["#003A70", "#B87333"],
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Row>
              <div className="pb-3">
                <h2 className="text-center pt-3" style={{ color: "#003a70" }}>
                  Quick Stats
                </h2>

                <div className="de-flex row justify-content-center">
                  <div className="shadow col-6 col-lg-3 mx-2 mt-5 mb-1 text-center rounded-3  card-animation card-delay-1">
                    <div className="fs-6 py-3">
                      <PersonFill size={20} color="#B87333" />
                      <span className="ps-3" style={{ color: "#666666" }}>
                        Total Registered Users
                      </span>
                    </div>
                    <div
                      className="fs-5 pb-2 fw-bold"
                      style={{ color: "#003A70" }}
                    >
                      450
                    </div>
                  </div>

                  <div className="shadow col-6 col-lg-3 mx-2 mt-5 mb-1 text-center rounded-3 card-animation card-delay-3">
                    <div className="fs-6 py-3">
                      <CurrencyDollar size={20} color="#B87333" />
                      <span className="ps-3" style={{ color: "#666666" }}>
                        Sales Revenue
                      </span>
                    </div>
                    <div
                      className="fs-5 pb-2 fw-bold"
                      style={{ color: "#003A70" }}
                    >
                      13426.5 JOD
                    </div>
                  </div>
                  <div className="shadow col-6 col-lg-3 mx-2 mt-5 mb-1 text-center rounded-3 card-animation card-delay-4">
                    <div className="fs-6 py-3">
                      <CurrencyDollar size={20} color="#B87333" />
                      <span className="ps-3" style={{ color: "#666666" }}>
                        Earnings
                      </span>
                    </div>
                    <div
                      className="fs-5 pb-2 fw-bold"
                      style={{ color: "#003A70" }}
                    >
                      10,000 JOD
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-center py-3" style={{ color: "#003a70" }}>
                  Sales & Earning
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
              <div className="shadow w-100">
                <Chart
                  chartType="PieChart"
                  data={data}
                  options={options}
                  width={"100%"}
                />
              </div>
            </Row>
          </Col>

          <Col>
            <Row>
              <div className="mb-1">
                <h2 className="text-center py-3" style={{ color: "#003a70" }}>
                  Traffic & Analytics
                </h2>
                <div className="text-center">
                  <Container className="d-flex justify-content-evenly">
                    <Button
                      style={{
                        backgroundColor: "#B87333",
                        borderColor: "#B87333",
                      }}
                      size="md"
                    >
                      Weekly
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#B87333",
                        borderColor: "#B87333",
                      }}
                      size="md"
                    >
                      Monthly
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#B87333",
                        borderColor: "#B87333",
                      }}
                      size="md"
                    >
                      Yearly
                    </Button>
                  </Container>
                  <Row className="justify-content-center">
                    <Col xs={12} md={10} lg={8} className="shadow py-5 my-5">
                      <Chart1 />
                    </Col>
                  </Row>
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Overview;
