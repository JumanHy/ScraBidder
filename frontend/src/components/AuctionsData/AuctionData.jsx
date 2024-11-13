import "./style.css";
import{ React , useState}from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal, Button ,Container,Row,Col,Form,Image,Dropdown} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import scrap from "../../assets/images/scrap.png"

function UsersData(){
    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => setShowModal(false);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };
    const [selectedUser, setSelectedUser] = useState({});
    const [auctionStatus, setAuctionStatus] = useState('');
    const columns=[
        {name:'ID' , selector:row=>row.id,sortable:true },
        {name:'Auction Title' , width:'300px',selector:row=>row.name,sortable:true,
            cell: row => (
                <a
                href="#"
                className="user-name-link" 
                onClick={() => handleUserClick(row)}
            >
                {row.name}
            </a>
            ) },
        {name:'Seller' , selector:row=>row.seller,sortable:true },
        {name:'Start Date' , selector:row=>row.start,sortable:true },
        {name:'End Date' , selector:row=>row.end,sortable:true },
        {name:'Category' , selector:row=>row.category,sortable:true },
        {name:'Auction Status' , selector:row=>row.status,sortable:true,
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
                        {row.status}
                    </span>
                );
            }

        }
    ]
    const data = [
        { id: 1, name: 'Scrap Metal Auction - Lot 1', seller: 'Juman', start: '2024-01-10', end: '2024-02-15', category: 'Iron', status: 'Active' },
        { id: 2, name: 'Scrap Metal Auction - Lot 2', seller: 'Ahmed', start: '2024-01-12', end: '2024-02-16', category: 'Aluminum', status: 'Pending' },
        { id: 3, name: 'Scrap Metal Auction - Lot 3', seller: 'Khaled', start: '2024-01-14', end: '2024-02-17', category: 'Copper', status: 'Sold' },
        { id: 4, name: 'Scrap Metal Auction - Lot 4', seller: 'Laila', start: '2024-01-16', end: '2024-02-18', category: 'Plastic', status: 'Not Sold' },
        { id: 5, name: 'Scrap Metal Auction - Lot 5', seller: 'Sarah', start: '2024-01-18', end: '2024-02-19', category: 'Stainless Steel', status: 'Listed' },
        { id: 6, name: 'Scrap Metal Auction - Lot 6', seller: 'Ali', start: '2024-01-20', end: '2024-02-20', category: 'Wood', status: 'Active' },
        { id: 7, name: 'Scrap Metal Auction - Lot 7', seller: 'Zainab', start: '2024-01-22', end: '2024-02-21', category: 'Glass', status: 'Pending' },
        { id: 8, name: 'Scrap Metal Auction - Lot 8', seller: 'Youssef', start: '2024-01-24', end: '2024-02-22', category: 'Paper', status: 'Sold' },
        { id: 9, name: 'Scrap Metal Auction - Lot 9', seller: 'Samira', start: '2024-01-26', end: '2024-02-23', category: 'Iron', status: 'Not Sold' },
        { id: 10, name: 'Scrap Metal Auction - Lot 10', seller: 'Fahad', start: '2024-01-28', end: '2024-02-24', category: 'Aluminum', status: 'Listed' },
        { id: 11, name: 'Scrap Metal Auction - Lot 11', seller: 'Hassan', start: '2024-01-30', end: '2024-02-25', category: 'Copper', status: 'Active' },
        { id: 12, name: 'Scrap Metal Auction - Lot 12', seller: 'Layla', start: '2024-02-01', end: '2024-02-26', category: 'Plastic', status: 'Pending' },
        { id: 13, name: 'Scrap Metal Auction - Lot 13', seller: 'Tariq', start: '2024-02-03', end: '2024-02-27', category: 'Stainless Steel', status: 'Sold' },
        { id: 14, name: 'Scrap Metal Auction - Lot 14', seller: 'Rania', start: '2024-02-05', end: '2024-02-28', category: 'Wood', status: 'Not Sold' },
        { id: 15, name: 'Scrap Metal Auction - Lot 15', seller: 'Omar', start: '2024-02-07', end: '2024-03-01', category: 'Glass', status: 'Listed' },
        { id: 16, name: 'Scrap Metal Auction - Lot 16', seller: 'Jana', start: '2024-02-09', end: '2024-03-02', category: 'Paper', status: 'Active' },
        { id: 17, name: 'Scrap Metal Auction - Lot 17', seller: 'Yara', start: '2024-02-11', end: '2024-03-03', category: 'Iron', status: 'Pending' },
        { id: 18, name: 'Scrap Metal Auction - Lot 18', seller: 'Sami', start: '2024-02-13', end: '2024-03-04', category: 'Aluminum', status: 'Sold' },
        { id: 19, name: 'Scrap Metal Auction - Lot 19', seller: 'Mariam', start: '2024-02-15', end: '2024-03-05', category: 'Copper', status: 'Not Sold' },
        { id: 20, name: 'Scrap Metal Auction - Lot 20', seller: 'Amina', start: '2024-02-17', end: '2024-03-06', category: 'Plastic', status: 'Listed' },
        { id: 21, name: 'Scrap Metal Auction - Lot 21', seller: 'Zaid', start: '2024-02-19', end: '2024-03-07', category: 'Stainless Steel', status: 'Active' },
        { id: 22, name: 'Scrap Metal Auction - Lot 22', seller: 'Lina', start: '2024-02-21', end: '2024-03-08', category: 'Wood', status: 'Pending' },
        { id: 23, name: 'Scrap Metal Auction - Lot 23', seller: 'Kareem', start: '2024-02-23', end: '2024-03-09', category: 'Glass', status: 'Sold' },
        { id: 24, name: 'Scrap Metal Auction - Lot 24', seller: 'Fatima', start: '2024-02-25', end: '2024-03-10', category: 'Paper', status: 'Not Sold' },
        { id: 25, name: 'Scrap Metal Auction - Lot 25', seller: 'Ahmed', start: '2024-02-27', end: '2024-03-11', category: 'Iron', status: 'Listed' },
        { id: 26, name: 'Scrap Metal Auction - Lot 26', seller: 'Juman', start: '2024-03-01', end: '2024-03-12', category: 'Aluminum', status: 'Active' },
        { id: 27, name: 'Scrap Metal Auction - Lot 27', seller: 'Mohammed', start: '2024-03-03', end: '2024-03-13', category: 'Copper', status: 'Pending' },
        { id: 28, name: 'Scrap Metal Auction - Lot 28', seller: 'Khaled', start: '2024-03-05', end: '2024-03-14', category: 'Plastic', status: 'Sold' },
        { id: 29, name: 'Scrap Metal Auction - Lot 29', seller: 'Laila', start: '2024-03-07', end: '2024-03-15', category: 'Stainless Steel', status: 'Not Sold' },
        { id: 30, name: 'Scrap Metal Auction - Lot 30', seller: 'Ali', start: '2024-03-09', end: '2024-03-16', category: 'Wood', status: 'Listed' },
        { id: 31, name: 'Scrap Metal Auction - Lot 31', seller: 'Youssef', start: '2024-03-11', end: '2024-03-17', category: 'Glass', status: 'Active' },
        { id: 32, name: 'Scrap Metal Auction - Lot 32', seller: 'Samira', start: '2024-03-13', end: '2024-03-18', category: 'Paper', status: 'Pending' },
        { id: 33, name: 'Scrap Metal Auction - Lot 33', seller: 'Fahad', start: '2024-03-15', end: '2024-03-19', category: 'Iron', status: 'Sold' },
        { id: 34, name: 'Scrap Metal Auction - Lot 34', seller: 'Rania', start: '2024-03-17', end: '2024-03-20', category: 'Aluminum', status: 'Not Sold' },
        { id: 35, name: 'Scrap Metal Auction - Lot 35', seller: 'Fatima', start: '2024-03-19', end: '2024-03-21', category: 'Copper', status: 'Listed' },
        { id: 36, name: 'Scrap Metal Auction - Lot 36', seller: 'Hassan', start: '2024-03-21', end: '2024-03-22', category: 'Plastic', status: 'Active' },
        { id: 37, name: 'Scrap Metal Auction - Lot 37', seller: 'Layla', start: '2024-03-23', end: '2024-03-23', category: 'Stainless Steel', status: 'Pending' },
        { id: 38, name: 'Scrap Metal Auction - Lot 38', seller: 'Mariam', start: '2024-03-25', end: '2024-03-24', category: 'Wood', status: 'Sold' },
        { id: 39, name: 'Scrap Metal Auction - Lot 39', seller: 'Amina', start: '2024-03-27', end: '2024-03-25', category: 'Glass', status: 'Not Sold' },
        { id: 40, name: 'Scrap Metal Auction - Lot 40', seller: 'Zaid', start: '2024-03-29', end: '2024-03-26', category: 'Paper', status: 'Listed' }
      ];
      
    
    const bidColumns=[
        {name:'ID' , selector:row=>row.id,sortable:true },
        {name:'Bidder Name' , selector:row=>row.name,sortable:true,
            cell: row => (
                <a
                href="#"
                className="user-name-link" 
                onClick={() => handleUserClick(row)}
            >
                {row.name}
            </a>
            ) },
        {name:'Bid Amount(JOD)' , selector:row=>row.amount,sortable:true },
        {name:'Bid Time' , selector:row=>row.time,sortable:true },

    ]
    const bidData=[
        {id: 1, name: 'Ahmad Zytoon', amount: 500, time: '2024-02-15'},
  {id: 2, name: 'Mohammad Alghamdi', amount: 450, time: '2024-02-16'},
  {id: 3, name: 'Laila Hassan', amount: 600, time: '2024-02-17'},
  {id: 4, name: 'Sarah Khaled', amount: 700, time: '2024-02-18'},
  {id: 5, name: 'Ali Alsaadi', amount: 550, time: '2024-02-19'},
  {id: 6, name: 'Zainab Hamdan', amount: 800, time: '2024-02-20'},
  {id: 7, name: 'Mona Fawzi', amount: 650, time: '2024-02-21'},
  {id: 8, name: 'Youssef Awad', amount: 750, time: '2024-02-22'},
  {id: 9, name: 'Samira Nabil', amount: 500, time: '2024-02-23'},
  {id: 10, name: 'Khaled Ali', amount: 700, time: '2024-02-24'},
  {id: 11, name: 'Rania Mostafa', amount: 800, time: '2024-02-25'},
  {id: 12, name: 'Fahad Sultan', amount: 400, time: '2024-02-26'},
  {id: 13, name: 'Hassan Faris', amount: 900, time: '2024-02-27'},
  {id: 14, name: 'Layla Issam', amount: 650, time: '2024-02-28'},
  {id: 15, name: 'Tariq Alhassan', amount: 500, time: '2024-03-01'},
  {id: 16, name: 'Rasha Yassin', amount: 600, time: '2024-03-02'},
  {id: 17, name: 'Ahmed Shakir', amount: 700, time: '2024-03-03'},
  {id: 18, name: 'Fatima Rashed', amount: 750, time: '2024-03-04'},
  {id: 19, name: 'Omar Hamid', amount: 650, time: '2024-03-05'},
  {id: 20, name: 'Jana Nour', amount: 800, time: '2024-03-06'},
  {id: 21, name: 'Yara Asad', amount: 500, time: '2024-03-07'},
  {id: 22, name: 'Sami Jaber', amount: 900, time: '2024-03-08'},
  {id: 23, name: 'Mariam Ghanem', amount: 700, time: '2024-03-09'},
  {id: 24, name: 'Amina Ibrahim', amount: 800, time: '2024-03-10'},
  {id: 25, name: 'Zaid Alharbi', amount: 600, time: '2024-03-11'},
  {id: 26, name: 'Lina Nassar', amount: 550, time: '2024-03-12'},
  {id: 27, name: 'Kareem Abdallah', amount: 750, time: '2024-03-13'},
  {id: 28, name: 'Mariam Tarek', amount: 800, time: '2024-03-14'},
  {id: 29, name: 'Ibrahim Khamis', amount: 650, time: '2024-03-15'},
  {id: 30, name: 'Layla Mounir', amount: 500, time: '2024-03-16'}
    ]
 

    const [records,setRecords]=useState(data);
    const [bidRecords,setBidRecords]=useState(bidData);
    
     function handleBidFilter(event){
        const newData=bidData.filter(row=>{
            return row.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            
        })
        setBidRecords(newData)
    }
    function handleAuctionFilter(event){
        const newData=data.filter(row=>{
            return row.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            
        })
        setRecords(newData)
    }
    function handleStatusFilter(event){
        const newData=data.filter(row=>{
            return row.status===event;
            
        })
        setRecords(newData)
    }

    function handleCategoryFilter(event){
        const newData=data.filter(row=>{
            return row.category===event;
            
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
            <Dropdown.Item href="#" onClick={() => setRecords(data)}>All</Dropdown.Item>
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
            <Dropdown.Item href="#" onClick={() => setRecords(data)}>All</Dropdown.Item>
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
                            <div>{selectedUser.name}</div>
                        </Row>
                        <Row className="fw-bold mb-2">
                            <div style={{color:'#003A70'}}>Starting Price</div>
                            <div>500 JOD</div>
                        </Row>
                        <Row className="fw-bold mb-2">
                            <div style={{color:'#003A70'}}>Reservce Price</div>
                            <div>1452 JOD</div>
                        </Row>
                        </Col>
                    </Container>
                    <div className="mx-5 mt-3 px-2">
                    <div style={{color:'#003A70'}} className="fw-bold mb-2">Description</div>
                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quidem iusto aliquid, eius in vitae obcaecati nobis nihil maxime similique ipsum doloribus doloremque, impedit commodi? Nisi, quos alias. Quam, quia!</div>
                    </div>
                    <div className="text-white p-2 mt-5 mb-5 w-100 text-center rounded"  style={{backgroundColor:"#003A70"}}>Seller Information</div>

                    <Container className="d-flex justify-content-between mb-5 border-bottom pb-5">
                        <Col>
                        <Row className="fw-bold mb-4">
                            <div style={{color:'#003A70'}}>Company Name</div>
                            <div>{selectedUser.name}</div>
                        </Row>
                        <Row className="fw-bold">
                            <div style={{color:'#003A70'}}>Phone Number</div>
                            <div>077 1234567</div>
                        </Row>
                        </Col>
                        <Col>
                        <Row className="fw-bold mb-4">
                            <div style={{color:'#003A70'}}>Email</div>
                            <div>email@gmail.com</div>
                        </Row>
                        <Row className="fw-bold">
                            <div style={{color:'#003A70'}}>Registration Date</div>
                            <div>5\2\2024 22:10:23</div>
                        </Row>
                        </Col>
                    </Container>
                    <div className="mb-4 d-flex justify-content-between">
                    <div className="fw-bold" style={{color:'#003A70'}}>Auction Status: <span 
                            style={{
                                fontWeight: 'bold',
                                color: 
                                    selectedUser.status === 'Active' ? 'green' : 
                                    selectedUser.status === 'Pending' ? 'orange' : 
                                    selectedUser.status === 'Sold' ? 'grey' : 
                                    selectedUser.status === 'Not Sold' ? 'red' :
                                    selectedUser.status === 'Listed' ? 'blue' :
                                    '#000000', 
                            }}>{selectedUser.status}
                        </span></div>
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

        <div className="m-5">
        <h2 className="text-center pt-3 mb-3" style={{color:'#003a70'}}>Bidding History</h2>
            
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
