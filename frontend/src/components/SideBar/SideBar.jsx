import React ,{useState,useEffect}from "react";
import { Container, Col, Row } from 'react-bootstrap';
import { House, Person, Hammer, BarChart } from 'react-bootstrap-icons';
import "./style.css";
import Overview from "../Overview/Overview";
import UsersData from "../UsersData/UsersData";
import AuctionsData from "../AuctionsData/AuctionData";
import Stats from "../Stats/Stats";

function SideBar() {
    const [activeComponent, setActiveComponent] = useState(localStorage.getItem('activeComponent') || 'overview');
    const handleComponentChange = (component) => {
        setActiveComponent(component);
        localStorage.setItem('activeComponent', component);
    };
    useEffect(() => {
        const savedComponent = localStorage.getItem('activeComponent');
        if (savedComponent) {
            setActiveComponent(savedComponent);
        }
    }, []);
    return (
        <Container fluid className=" p-0 m-0">
            <Row className="flex-nowrap main-content" >
                <Col xs={2} sm={3} lg={2} xl={2} className="sidebar p-0 text-center">
                    <a href="#"  className={`sidebarlink text-decoration-none ${activeComponent === 'overview' ? 'active' : ''}`}
                        onClick={() => handleComponentChange('overview')}>
                        <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
                            <House size={25} color="white" />
                            <span className="ms-2 d-none d-sm-inline">Overview</span>
                        </div>
                    </a>
                    <a href="#"  className={`sidebarlink text-decoration-none ${activeComponent === 'users' ? 'active' : ''}`}
                        onClick={() => handleComponentChange('users')}>
                        <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
                            <Person size={25} color="white" />
                            <span className="ms-2 d-none d-sm-inline">Users</span>
                        </div>
                    </a>
                    <a href="#"  className={`sidebarlink text-decoration-none ${activeComponent === 'auctions' ? 'active' : ''}`}
                        onClick={() => handleComponentChange('auctions')}>
                        <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
                            <Hammer size={25} color="white" />
                            <span className="ms-2 d-none d-sm-inline">Auctions</span>
                        </div>
                    </a>
                    <a href="#"  className={`sidebarlink text-decoration-none ${activeComponent === 'stats' ? 'active' : ''}`}
                        onClick={() => handleComponentChange('stats')}>
                        <div className="d-flex flex-column align-items-center py-3 text-white border-bottom border-black">
                            <BarChart size={25} color="white" />
                            <span className="ms-2 d-none d-sm-inline">Statistics</span>
                        </div>
                    </a>
                </Col>

                <Col xs={10} sm={9} lg={10} xl={10} style={{ backgroundColor: "#F5F5F5"}} className="dashboard-component"  >
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
