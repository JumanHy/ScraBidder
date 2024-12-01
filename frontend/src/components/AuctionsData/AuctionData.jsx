import "./style.css";
import{ React , useEffect, useState}from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal, Button ,Container,Row,Col,Form,Image,Dropdown} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import scrap from "../../assets/images/scrap.png"
import axios from "axios";

function UsersData({auctions ,BiddingHistory}){

    const [records,setRecords]=useState([]);
    const [bidRecords,setBidRecords]=useState(BiddingHistory);
    const [showModal, setShowModal] = useState(false);
    const [selectedAuction, setSelectedAuction] = useState(null);
    const [selectedBid, setSelectedBid] = useState(null);

    const handleModalClose = () => {
      setShowModal(false);
      setSelectedAuction(null);
      setSelectedBid(null);
    }

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

const handleAuctionRowClick =async (auction) => {
  try {
    const auctionId = auction.auctionId; // Use the correct property for the auction ID
    const response =await axios.get(`http://localhost:5125/api/auction/${auctionId}`);
    console.log(response);
    // Set the selected auction and open the modal
    setSelectedAuction(response.data);
    setShowModal(true);
  } catch (error) {
    console.error("Error fetching auction details:", error);
    alert("Could not load auction details.");
  }         
};
const handleBidRowClick =async (bid) => {
  try {
    const bidId = bid.bidId; // Use the correct property for the auction ID
    const response =await axios.get(`http://localhost:5125/api/biddinghistory/${bidId}`);
    console.log(response);
    // Set the selected auction and open the modal
    setSelectedBid(response.data);
    setShowModal(true);
  } catch (error) {
    console.error("Error fetching auction details:", error);
    alert("Could not load auction details.");
  }         
};
    
    const columns=[
        {name:'ID' , width:'100px', selector:row=>row.auctionId,sortable:true },
        {name:'Auction Title' , width:'200px',selector:row=>row.title,sortable:true,
            cell: row => (
                <a
                href="#"
                className="user-name-link" 
                onClick={() => handleAuctionRowClick(row)}
            >
                {row.title}
            </a>
            ) },
        {name:'Seller' , selector:row=>row.seller.email,sortable:true },
        {name:'Start Date' , selector:row=>row.startingTime,sortable:true },
        {name:'End Date' , selector:row=>row.endingTime,sortable:true },
        {name:'Category' ,width:'150px', selector:row=>row.category.categoryName,sortable:true },
        {name:'Status' , width:'150px',selector:row=>row.auctionStatus,sortable:true,
            cell: row => {
                const colorMap = {
                    Active: 'green',
                    Pending: 'orange',
                    Sold: 'grey',
                    'Not Sold': 'red',
                    Listed: 'blue',
                };
            
                return (
                    <span
                        style={{
                            color: colorMap[row.status] || 'black',  // Default to black if status is not found
                            fontWeight: 'bold',
                        }}
                    >
                        {row.auctionStatus}
                    </span>
                );
            }

        }
    ]

      
    
    const bidColumns=[
        {name:'ID' ,  width:'100px',selector:row=>row.bidId,sortable:true },
        {name:'Bidder Name' , selector:row=>row.bidder.email,sortable:true,
            cell: row => (
                <a
                href="#"
                className="user-name-link" 
                onClick={() => handleBidRowClick(row)}
            >
                {row.bidder.email}
            </a>
            ) },
        {name:'Bid Amount(JOD)' , selector:row=>row.bidAmount,sortable:true },
        {name:'Bid Time' , selector:row=>row.bidTime,sortable:true },
        {name:'Auction ID' , selector:row=>row.auctionId.auctionId,sortable:true,
          cell: row => (
              <a
              href="#"
              className="user-name-link" 
              onClick={() => handleUserClick(row)}
          >
              {row.auctionId}
          </a>
          ) },

    ]
  

    
    
    
     function handleBidFilter(event){
        const newData=bidData.filter(row=>{
            return row.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            
        })
        setBidRecords(newData)
    }
    function handleAuctionFilter(event){
        const newData=auctions.filter(row=>{
            return row.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            
        })
        setRecords(newData)
    }
    function handleStatusFilter(event){
        const newData=auctions.filter(row=>{
          return row.auctionStatus.toLowerCase() === event.toLowerCase();
            
        })
        setRecords(newData)
    }

    function handleCategoryFilter(event){
        const newData=auctions.filter(row=>{
            return row.category.categoryName===event;
            
        })
        setRecords(newData)
    }
    return(
        <>
       
              
       <Row className="justify-content-between px-2 pt-2">
      <Col xs={12} sm={6} md={3} className="mt-4">
        <span style={{ color: '#666666' }} className="me-2">start/end date</span>
        <Form.Control type="date" className="rounded-5"/>
      </Col>

      <Col xs={12} sm={6} md={3} className="mt-5">
        <Dropdown>
          <Dropdown.Toggle variant="light" className="w-75" style={{ backgroundColor: '#E6E6E6', fontSize: '15px' }}>
            auction status
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={() => setRecords(auctions)}>All</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleStatusFilter('Active')}>Active</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleStatusFilter('Pending')}>Pending</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleStatusFilter('Sold')}>Sold</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleStatusFilter('Not Sold')}>Not Sold</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleStatusFilter('Listed')}>Listed</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      <Col xs={12} sm={6} md={3} className="mt-5">
        <Dropdown>
          <Dropdown.Toggle variant="light" className="w-75" style={{ backgroundColor: '#E6E6E6', fontSize: '15px' }}>
            auction category
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={() => setRecords(auctions)}>All</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleCategoryFilter('Aluminum')}>Aluminum</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleCategoryFilter('Copper')}>Copper</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleCategoryFilter('Plastic')}>Plastic</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleCategoryFilter('Iron')}>Iron</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleCategoryFilter('Stainless Steel')}>Stainless Steel</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleCategoryFilter('Wood')}>Wood</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleCategoryFilter('Glass')}>Glass</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => handleCategoryFilter('Paper')}>Paper</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
       

    <div className="m-5">
      <Row className="justify-content-between mb-4">
        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
          <div className="d-flex align-items-center">
            <span className="me-3">Action</span>
            <Dropdown className="d-inline">
              <Dropdown.Toggle
                variant="light"
                className="px-2"
                style={{ backgroundColor: '#E6E6E6', fontSize: '15px' }}
              >
                select
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Block</Dropdown.Item>
                <Dropdown.Item href="#">Accept</Dropdown.Item>
                <Dropdown.Item href="#">Action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
          <div
            className="d-flex align-items-center bg-white rounded-5 border border-black px-2"
            style={{ maxWidth: '100%', borderColor: '#003A70', height: '40px' }}
          >
            <Form.Control
              type="text"
              placeholder="Search by auction ID"
              className="border-0 w-100"
              style={{ outline: 'none' }}
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
        onRowClicked={handleBidRowClick}
        customStyles={{
          rows: {
            style: {
              fontSize: '16px', 
              borderRadius: '0 0 10px 10px'
            },
          },

          headCells: {
            style: {
              backgroundColor: '#003A70', 
              color: 'white', 
              fontSize: '17px', 
              fontWeight: 'bold', 
               borderRadius: '10px 10px 0 0'
            },
          },
        }}
      />
    </div>

        <Modal show={showModal} onHide={handleModalClose} size="lg">
                <Modal.Header closeButton style={{ backgroundColor: '#003A70', color: 'white' }} className="flex justify-content-center text-center" >
                    <Modal.Title>Auction Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    
                    
                    <Container className="d-flex justify-content-between">
                        <Col className="ms-5">
                        <Image src={scrap} className="rounded w-75"></Image>
                        </Col>
                        <Col className="ms-5">
                        <Row className="fw-bold mb-2">
                            <div style={{color:'#003A70'}}>Auction Title</div>
                            {selectedAuction && <div>{selectedAuction.title}</div>}
                        </Row>
                        <Row className="fw-bold mb-2">
                            <div style={{color:'#003A70'}}>Starting Price</div>
                            {selectedAuction && <div>{selectedAuction.startingBid}</div>}
                        </Row>
                        <Row className="fw-bold mb-2">
                            <div style={{color:'#003A70'}}>Reservce Price</div>
                            {selectedAuction && <div>{selectedAuction.reservePrice}</div>}
                        </Row>
                        </Col>
                    </Container>
                    <div className="mx-5 mt-3 px-2">
                    <div style={{color:'#003A70'}} className="fw-bold mb-2">Description</div>
                    {selectedAuction && <div>{selectedAuction.description
}</div>}                    </div>
                    <div className="text-white p-2 mt-5 mb-5 w-100 text-center rounded"  style={{backgroundColor:"#003A70"}}>Seller Information</div>

                    <Container className="d-flex justify-content-between mb-5 border-bottom pb-5">
                        <Col>
                        <Row className="fw-bold mb-4">
                            <div style={{color:'#003A70'}}>Company Name</div>
                            {selectedAuction && <div>{selectedAuction.seller.email}</div>}
                        </Row>
                        <Row className="fw-bold">
                            <div style={{color:'#003A70'}}>Phone Number</div>
                            <div>077 1234567</div>
                        </Row>
                        </Col>
                        <Col>
                        <Row className="fw-bold mb-4">
                            <div style={{color:'#003A70'}}>Email</div>
                            {selectedAuction && <div>{selectedAuction.seller.email}</div>}
                        </Row>
                        <Row className="fw-bold">
                            <div style={{color:'#003A70'}}>Registration Date</div>
                            {selectedAuction && <div>{selectedAuction.seller.createdAt}</div>}
                        </Row>
                        </Col>
                    </Container>
                    <div className="mb-4 d-flex justify-content-between">
                    {selectedAuction&&
                    <div className="fw-bold" style={{color:'#003A70'}}>Auction Status: <span 
                    style={{
                        fontWeight: 'bold',
                        color: 
                        selectedAuction.auctionStatus === 'Active' ? 'green' : 
                        selectedAuction.auctionStatus === 'Pending' ? 'orange' : 
                        selectedAuction.auctionStatus === 'Sold' ? 'grey' : 
                        selectedAuction.auctionStatus === 'Not Sold' ? 'red' :
                        selectedAuction.auctionStatus === 'Listed' ? 'blue' :
                            '#000000', 
                    }}>{selectedAuction.auctionStatus}
                </span></div>
                    }
                        <div>
                        <Button variant="success" className="me-2"> Approve</Button>
                        <Button variant="danger">Reject</Button>
                        
                        </div>
                        
                    
                    </div>
                    <div className="fw-bold" style={{color:'#003A70'}}>Highest Bid :</div>
                    
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-center w-100 my-3">
                    <Button className="w-25 text-white" variant="secondary" onClick={handleModalClose} style={{backgroundColor:'#B87333' ,borderColor:'#B87333'}}>
                        Close
                    </Button>
                    </div>
                </Modal.Footer>
            </Modal>
       
           

           
        <div style={{height:'100px'}}></div>

        <div className="mb-3">
        <h2 className="text-center mb-3" style={{color:'#003a70'}}>Bidding History</h2>
            
        <div
                className="col-12 d-flex p-2 m-3 bg-white rounded-5 justify-content-between border border-black "
                style={{
                  maxWidth: "250px",
                  height:'40px',
                  borderColor:'#003A70',
                }}
              >
                <input
                  type="text"
                  placeholder="Search by auction ID"
                  className="w-100 border-0 "
                  style={{
                    outline: "none"
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
        fontSize: '16px', 
        borderRadius: '0 0 10px 10px'
      },
    },
    headCells: {
      style: {
        backgroundColor: '#003A70', 
        color: 'white', 
        fontSize: '17px', 
        fontWeight: 'bold', 
         borderRadius: '10px 10px 0 0'
      },
    },
  }}
></DataTable>
        </div>
        
        </>
    );
}
export default UsersData;
