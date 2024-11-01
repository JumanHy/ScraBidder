import React from "react";
import { ShieldLock, Wallet } from 'react-bootstrap-icons';
import { FaLeaf } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

function WhyUs() {
    return (
        <div
            className="d-flex flex-column align-items-center pt-4 pb-4"
            style={{
                backgroundColor: "#FAFAFA",
                color: "#003A70",
                letterSpacing: 5,
            }}
        >
            <h2>Why Choose Us?</h2>

            <div className="container pt-4 pb-5">
                <div className="row justify-content-center">
                    {/* Card 1 */}
                    <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center pb-3">
                        <div
                            className="card d-flex flex-column align-items-center p-3"
                            style={{
                                width: "100%",
                                maxWidth: 400,
                                height: 200,
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            <ShieldLock className="me-2 thicker-icon mt-2" size={40} color="#003A70" />
                            <h4 className="pt-3" style={{ color: "#003A70" }}>Trusted Platform</h4>
                            <h6 className="pt-3 text-center" style={{ color: "#333333", letterSpacing: 1 }}>
                                We prioritize security and transparency in every transaction.
                            </h6>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center pb-3">
                        <div
                            className="card d-flex flex-column align-items-center p-3"
                            style={{
                                width: "100%",
                                maxWidth: 400,
                                height: 200,
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            <FaLeaf className="me-2 mt-2" size={40} color="#003A70" />
                            <h4 className="pt-3" style={{ color: "#003A70" }}>Eco-Friendly</h4>
                            <h6 className="pt-3 text-center" style={{ color: "#333333", letterSpacing: 1 }}>
                                Turns your recyclables into resources for a cleaner, healthier planet.
                            </h6>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center pb-3">
                        <div
                            className="card d-flex flex-column align-items-center p-3"
                            style={{
                                width: "100%",
                                maxWidth: 400,
                                height: 200,
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            <Wallet className="me-2 thicker-icon mt-2" size={40} color="#003A70" />
                            <h4 className="pt-3" style={{ color: "#003A70" }}>Affordable Deals</h4>
                            <h6 className="pt-3 text-center" style={{ color: "#333333", letterSpacing: 1 }}>
                                Best deals that maximize your returns and minimize waste.
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyUs;
