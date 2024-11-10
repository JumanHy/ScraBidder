import React ,{useState}from "react";
import { Container, Col, Row } from 'react-bootstrap';
import { House, Person, Hammer, BarChart } from 'react-bootstrap-icons';
import "./style.css";
import Overview from "../Overview/Overview";
import UsersData from "../UsersData/UsersData";
import AuctionsData from "../AuctionsData/AuctionData";
import Stats from "../Stats/Stats";

function SideBar() {
    const [activeComponent, setActiveComponent] = useState('overview'); 
    const handleComponentChange = (component) => {
        setActiveComponent(component);
    };
    return (
        <Container fluid className="p-0 m-0">
            <Row className="flex-nowrap" >
                <Col xs={2} sm={3} lg={2} xl={2} className="sidebar p-0 text-center">
                    <a href="#" className="sidebarlink text-decoration-none" onClick={() => handleComponentChange('overview')}>
                        <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
                            <House size={25} color="white" />
                            <span className="ms-2 d-none d-sm-inline">Overview</span>
                        </div>
                    </a>
                    <a href="#" className="sidebarlink text-decoration-none" onClick={() => handleComponentChange('users')}>
                        <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
                            <Person size={25} color="white" />
                            <span className="ms-2 d-none d-sm-inline">Users</span>
                        </div>
                    </a>
                    <a href="#" className="sidebarlink text-decoration-none" onClick={() => handleComponentChange('auctions')}>
                        <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
                            <Hammer size={25} color="white" />
                            <span className="ms-2 d-none d-sm-inline">Auctions</span>
                        </div>
                    </a>
                    <a href="#" className="sidebarlink text-decoration-none"onClick={() => handleComponentChange('stats')}>
                        <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
                            <BarChart size={25} color="white" />
                            <span className="ms-2 d-none d-sm-inline">Statistics</span>
                        </div>
                    </a>
                </Col>

                <Col xs={10} sm={9} lg={10} xl={10} style={{ backgroundColor: "#F5F5F5" }}>
                {activeComponent === 'overview' && <Overview />}
                    {activeComponent === 'users' && <UsersData />}
                    {activeComponent === 'auctions' && <AuctionsData />}
                    {activeComponent === 'stats' && <Stats />}
                </Col>
            </Row>
        </Container>
    );
}

export default SideBar;
