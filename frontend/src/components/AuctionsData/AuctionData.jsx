import "./style.css";
import{ React , useState}from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal, Button ,Container,Row,Col,Form,Image} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Dot } from 'react-bootstrap-icons';
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
    {/*const [userType, setUserType] = useState('');

    */}
    const columns=[
        {name:'ID' , selector:row=>row.id,sortable:true },
        {name:'Auction Title' , selector:row=>row.name,sortable:true,
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
    const data=[
        
            { id: 1, name: 'Scrap Metal Auction - Lot 1', seller: 'Juman', start: '2024-01-10', end: '2024-02-15', status: 'Active' },
            { id: 2, name: 'Used Car Parts Auction - Lot 2', seller: 'Sara', start: '2023-11-22', end: '2024-01-05', status: 'Pending' },
            { id: 3, name: 'Electronics Scrap Auction - Lot 3', seller: 'Omar', start: '2024-03-10', end: '2024-03-25', status: 'Sold' },
            { id: 4, name: 'Industrial Equipment Scrap Auction - Lot 4', seller: 'Layla', start: '2024-02-12', end: '2024-04-01', status: 'Active' },
            { id: 5, name: 'Automobile Scrap Auction - Lot 5', seller: 'Noura', start: '2023-09-18', end: '2023-11-20', status: 'Not Sold' },
            { id: 6, name: 'Scrap Metal Auction - Lot 6', seller: 'Hassan', start: '2024-02-14', end: '2024-02-28', status: 'Listed' },
            { id: 7, name: 'Heavy Machinery Scrap Auction - Lot 7', seller: 'Reem', start: '2024-04-01', end: '2024-05-15', status: 'Active' },
            { id: 8, name: 'Construction Waste Auction - Lot 8', seller: 'Adil', start: '2023-12-01', end: '2024-01-15', status: 'Pending' },
            { id: 9, name: 'Metal Scrap Auction - Lot 9', seller: 'Huda', start: '2024-01-20', end: '2024-03-10', status: 'Sold' },
            { id: 10, name: 'Recycled Goods Auction - Lot 10', seller: 'Salim', start: '2024-02-05', end: '2024-03-20', status: 'Not Sold' },
            { id: 11, name: 'Auto Parts Auction - Lot 11', seller: 'Rana', start: '2024-03-15', end: '2024-04-10', status: 'Active' },
            { id: 12, name: 'Scrap Electronics Auction - Lot 12', seller: 'Basel', start: '2024-01-01', end: '2024-01-25', status: 'Listed' },
            { id: 13, name: 'Recycled Plastic Auction - Lot 13', seller: 'Yasmin', start: '2024-02-08', end: '2024-03-12', status: 'Pending' },
            { id: 14, name: 'Battery Scrap Auction - Lot 14', seller: 'Mohammed', start: '2023-11-10', end: '2023-12-15', status: 'Sold' },
            { id: 15, name: 'Furniture Scraps Auction - Lot 15', seller: 'Dina', start: '2024-04-05', end: '2024-04-20', status: 'Active' },
            { id: 16, name: 'Electronic Waste Auction - Lot 16', seller: 'Khaled', start: '2024-01-12', end: '2024-02-20', status: 'Not Sold' },
            { id: 17, name: 'Used Tires Auction - Lot 17', seller: 'Fadi', start: '2024-03-05', end: '2024-04-10', status: 'Sold' },
            { id: 18, name: 'Plastic Waste Auction - Lot 18', seller: 'Jalila', start: '2024-02-01', end: '2024-03-30', status: 'Active' },
            { id: 19, name: 'Old Machines Auction - Lot 19', seller: 'Mona', start: '2023-10-25', end: '2023-12-01', status: 'Pending' },
            { id: 20, name: 'Scrap Cars Auction - Lot 20', seller: 'Mustafa', start: '2024-03-15', end: '2024-04-05', status: 'Listed' },
            { id: 21, name: 'Aluminum Scrap Auction - Lot 21', seller: 'Naseem', start: '2024-01-01', end: '2024-02-10', status: 'Active' },
            { id: 22, name: 'Copper Scrap Auction - Lot 22', seller: 'Rasha', start: '2024-02-25', end: '2024-03-30', status: 'Sold' },
            { id: 23, name: 'Vehicle Parts Auction - Lot 23', seller: 'Lina', start: '2024-03-01', end: '2024-04-05', status: 'Not Sold' },
            { id: 24, name: 'Waste Paper Auction - Lot 24', seller: 'Wael', start: '2023-11-15', end: '2023-12-05', status: 'Listed' },
            { id: 25, name: 'Scrap Wire Auction - Lot 25', seller: 'Kareem', start: '2024-01-15', end: '2024-02-28', status: 'Active' },
            { id: 26, name: 'Plastic Scrap Auction - Lot 26', seller: 'Amira', start: '2024-02-10', end: '2024-03-15', status: 'Sold' },
            { id: 27, name: 'Old Appliances Auction - Lot 27', seller: 'Hadi', start: '2024-01-10', end: '2024-02-05', status: 'Pending' },
            { id: 28, name: 'Metal Scrap Auction - Lot 28', seller: 'Sami', start: '2024-02-20', end: '2024-03-25', status: 'Active' },
            { id: 29, name: 'Used Battery Auction - Lot 29', seller: 'Rida', start: '2023-12-01', end: '2024-01-01', status: 'Sold' },
            { id: 30, name: 'Scrap Plastics Auction - Lot 30', seller: 'Tariq', start: '2024-01-15', end: '2024-02-01', status: 'Not Sold' }
        
    ]

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
    
    {/*function handleFilter(event){
        const newData=data.filter(row=>{
            return row.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
            
        })
        setRecords(newData)
    }*/}
    function handleStatusFilter(event){
        const newData=data.filter(row=>{
            return row.status===event;
            
        })
        setRecords(newData)
    }
    {/*}
    function handleTypeFilter(event){
        const newData=data.filter(row=>{
            return row.type===e{ id: 1, name: 'Title 1', seller: 'Juman', start: '',end:'', status: 'Active' }vent;
            
        })
        setRecords(newData)
    }*/}
    return(
        <>
        
        <div
                className="col-12 d-flex p-2 m-3 bg-white rounded-5 justify-content-between align-items-center border border-black"
                style={{
                  maxWidth: "400px",
                  height:'40px',
                  borderColor:'#003A70',
                }}
              >
                <input
                  type="text"
                  placeholder="Search by username or email"
                  className="w-100 border-0 "
                  style={{
                    outline: "none"
                  }}
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

              
       <div className="d-flex justify-content-between px-2 border-bottom border-top py-5">
       <div className="w-25 me-0">
        <span style={{color:'#666666'}} className="me-2">start/end date</span>
       <Form.Control type="date"/>
       </div>

    <div className="dropdown mt-4">
  <button className="btn dropdown-toggle mt-0 px-5 " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:'#E6E6E6',fontSize:'15px'}}>
    auction status
  </button>
  <ul className="dropdown-menu">
  <li><a className="dropdown-item border-bottom" style={{color:'#666666',borderBottomColor:"#666666"}} href="#" onClick={() => setRecords(data)}>All</a></li>
    <li><a className="dropdown-item" href="#" onClick={() => handleStatusFilter('Active')}>Active</a></li>
    <li><a className="dropdown-item" href="#"onClick={() => handleStatusFilter('Pending')}>Pending</a></li>
    <li><a className="dropdown-item" href="#" onClick={() => handleStatusFilter('Sold')}>Sold</a></li>
    <li><a className="dropdown-item" href="#" onClick={() => handleStatusFilter('Not Sold')}>Not Sold</a></li>
    <li><a className="dropdown-item" href="#" onClick={() => handleStatusFilter('Listed')}>Listed</a></li>
  </ul>
        </div>

        <div className="dropdown mt-4">
  <button className="btn dropdown-toggle mt-0 px-5" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:'#E6E6E6',fontSize:'15px'}}>
    auction category
  </button>
  <ul className="dropdown-menu">
  <li><a className="dropdown-item border-bottom" style={{color:'#666666',borderBottomColor:"#666666"}} href="#"onClick={() => setRecords(data)} >All</a></li>
    <li><a className="dropdown-item" href="#" >Category 1</a></li>
    <li><a className="dropdown-item" href="#" >Category 2</a></li>
  </ul>
        </div>
        </div>
       

        <div className="m-5">
            <div className="d-flex justify-content-between mb-4">
                <div>
                <span className="me-3">Action</span>
            <div className="dropdown d-inline">
  <button className="btn dropdown-toggle mt-0 px-2 " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:'#E6E6E6',fontSize:'15px'}}>
    select
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Block</a></li>
    <li><a className="dropdown-item" href="#" >Accept</a></li>
    <li><a className="dropdown-item" href="#" >Action</a></li>
  </ul>
        </div>
                </div>
            <div className="text-end pb-3"><input type="text" placeholder="type to search" /></div>
            </div>
        

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
></DataTable>
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
                    <Button className="w-25" variant="secondary" onClick={handleModalClose} style={{backgroundColor:'#B87333' ,borderColor:'#B87333'}}>
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
data={bidData}
selectableRows
fixedHeader
pagination
responsive
striped
highlightOnHover
selectableRowsHighlight
></DataTable>
        </div>
        
        </>
    );
}
export default UsersData;
