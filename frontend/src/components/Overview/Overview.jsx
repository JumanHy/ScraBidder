import "./style.css";
import React from "react";
import { Button,Container,Row,Col} from "react-bootstrap";
import { Hammer , Person ,CurrencyDollar} from "react-bootstrap-icons";
import Chart1 from "../Chart/Chart";
import { Chart } from "react-google-charts";
import { Colors } from "chart.js";
import Feed from"./Feed";
function Overview(){
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
        colors:["#003A70","#B87333"]
    };
    return(
        <>

        <div className="pb-3 border-bottom mb-5" >
        <h2 className="text-center pt-3" style={{color:'#003a70'}}>Quick Stats</h2>
                    <div className="de-flex row justify-content-center">
                        <div className="shadow col-6 col-lg-3 mx-2 my-5 text-center rounded-3  card-animation card-delay-1">
                            <div className="fs-6 py-3">
                                <Hammer size={25} color="#B87333"/>
                                <span className="ps-3" style={{color:"#666666"}}>Active Auctions</span>
                            </div>
                            <div className="fs-3 pb-2 fw-bold" style={{color:'#003A70'}}>233</div>
                        </div>
                        <div className="shadow col-6 col-lg-3 mx-2 my-5 text-center rounded-3  card-animation card-delay-2">
                            <div className="fs-6 py-3">
                                <Person size={25} color="#B87333"/>
                                <span className="ps-3" style={{color:"#666666"}}>Total Registered Users</span>
                            </div>
                            <div className="fs-3 pb-2 fw-bold" style={{color:'#003A70'}}>450</div>
                        </div>
                        <div className="shadow col-6 col-lg-3 mx-2 my-5 text-center rounded-3  card-animation card-delay-3">
                            <div className="fs-6 py-3">
                                <Person size={25} color="#B87333"/>
                                <span className="ps-3" style={{color:"#666666"}}>New User Requests</span>
                            </div>
                            <div className="fs-3 pb-2 fw-bold" style={{color:'#003A70'}}>10</div>
                        </div>
                        <div className="shadow col-6 col-lg-3 mx-2 my-5 text-center rounded-3 card-animation card-delay-4">
                            <div className="fs-6 py-3">
                                <Hammer size={25} color="#B87333"/>
                                <span className="ps-3" style={{color:"#666666"}}>Sold Auctions</span>
                            </div>
                            <div className="fs-3 pb-2 fw-bold" style={{color:'#003A70'}}>112</div>
                        </div>
                        <div className="shadow col-6 col-lg-3 mx-2 my-5 text-center rounded-3 card-animation card-delay-5">
                            <div className="fs-6 py-3">
                                <CurrencyDollar size={25} color="#B87333"/>
                                <span className="ps-3" style={{color:"#666666"}}>Sales Revenue</span>
                            </div>
                            <div className="fs-3 pb-2 fw-bold" style={{color:'#003A70'}}>13426.5 JOD</div>
                        </div>
                    </div>
        </div>
        
        <div className="border-bottom mb-5">
        <h2 className="text-center py-3" style={{color:'#003a70'}}>Traffic & Analytics</h2>
        <div className="text-center">
        <Container className="d-flex justify-content-evenly py-3">
        <Button style={{backgroundColor:"#B87333",borderColor:"#B87333"}} size="lg">Weekly</Button>
        <Button style={{backgroundColor:"#B87333",borderColor:"#B87333"}} size="lg">Monthly</Button>
        <Button style={{backgroundColor:"#B87333",borderColor:"#B87333"}} size="lg">Yearly</Button>
        </Container>
        <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} className="shadow py-5 my-5">
              <Chart1 />
            </Col>
        </Row>
        </div>
        </div>
        <div className="border-bottom mb-5">
        <h2 className="text-center py-3" style={{color:'#003a70'}}>Recent Activities Feed</h2>
        <Feed/>
        </div>

        <div >
        <h2 className="text-center py-3" style={{color:'#003a70'}}>Sales & Earning</h2>
        <div className="text-center">
        <Container className="d-flex justify-content-evenly py-3">
        <Col xs="auto"><Button style={{backgroundColor:"#B87333",borderColor:"#B87333"}} size="lg">Weekly</Button></Col>
        <Col xs="auto"><Button style={{backgroundColor:"#B87333",borderColor:"#B87333"}} size="lg">Monthly</Button></Col>
        <Col xs="auto"><Button style={{backgroundColor:"#B87333",borderColor:"#B87333"}} size="lg">Yearly</Button></Col>
        </Container>
        </div>
        </div>

        <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4} className="d-flex justify-content-center m-5">
          <div className="m-3" style={{ maxWidth: "500px", width: "100%" }}>
            <div
              className="d-flex justify-content-between text-center shadow rounded p-4 my-5"
              style={{ color: "#003A70" }}
            >
              <h3>Cumulative Sales Value</h3>
              <h3>100,000 JOD</h3>
            </div>
            <div
              className="d-flex justify-content-between text-center shadow rounded px-4 py-5 my-5"
              style={{ color: "#B87333" }}
            >
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


        </>
    );
}
export default Overview;
