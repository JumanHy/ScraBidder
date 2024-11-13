import "./style.css";
import{ React , useState }from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal, Button ,Container,Row,Col} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { Dot } from 'react-bootstrap-icons';
function UsersData(){
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [accountStatus, setAccountStatus] = useState('');
    const [userType, setUserType] = useState('');

    const handleModalClose = () => setShowModal(false);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };
    const columns=[
        {name:'ID' , selector:row=>row.id,sortable:true },
        {name:'UserName' , selector:row=>row.name,sortable:true,
            cell: row => (
                <a
                href="#"
                className="user-name-link" 
                onClick={() => handleUserClick(row)}
            >
                {row.name}
            </a>
            ) },
        {name:'Email' , selector:row=>row.email,sortable:true },
        {name:'User Type' , selector:row=>row.type,sortable:true },
        {name:'Account Status' , selector:row=>row.status,sortable:true,
            cell: row => (
                <span
                    style={{
                        color: row.status === 'Active' ? 'green' : 'red',
                        fontWeight: 'bold',
                    }}
                >
                    {row.status}
                </span>
            )

         }
    ]
    const data=[
        
            { id: 1, name: 'Juman', email: 'jwalhayajneh@gmail.com', type: 'Super Admin', status: 'Active' },
            { id: 2, name: 'Sara Al-Bayati', email: 'sara.bayati@yahoo.com', type: 'Admin', status: 'Inactive' },
            { id: 3, name: 'Omar Khalil', email: 'omar.khalil@outlook.com', type: 'Indivisual', status: 'Active' },
            { id: 4, name: 'Layla Noor', email: 'layla.noor@gmail.com', type: 'Indivisual', status: 'Active' },
            { id: 5, name: 'Noura Samir', email: 'n.samir@gmail.com', type: 'Admin', status: 'Active' },
            { id: 6, name: 'Hassan Jaber', email: 'hjaber@gmail.com', type: 'Super Admin', status: 'Active' },
            { id: 7, name: 'Reem Al-Hadid', email: 'reem.hadid@outlook.com', type: 'Business', status: 'Inactive' },
            { id: 8, name: 'Adil Karim', email: 'adil.karim@yahoo.com', type: 'Admin', status: 'Active' },
            { id: 9, name: 'Huda Talib', email: 'huda.talib@gmail.com', type: 'Indivisual', status: 'Active' },
            { id: 10, name: 'Salim Quraishi', email: 'salim.q@gmail.com', type: 'Super Admin', status: 'Active' },
            { id: 11, name: 'Rana Hasan', email: 'rana.hasan@outlook.com', type: 'Indivisual', status: 'Inactive' },
            { id: 12, name: 'Basel Fathi', email: 'basel.fathi@gmail.com', type: 'Admin', status: 'Active' },
            { id: 13, name: 'Yasmin Aziz', email: 'yasmin.aziz@outlook.com', type: 'Indivisual', status: 'Active' },
            { id: 14, name: 'Mohammed Ameen', email: 'moh.ameen@gmail.com', type: 'Super Admin', status: 'Inactive' },
            { id: 15, name: 'Dina Mahdi', email: 'dina.mahdi@gmail.com', type: 'Admin', status: 'Active' },
            { id: 16, name: 'Khaled Zain', email: 'khaled.z@yahoo.com', type: 'Business', status: 'Active' },
            { id: 17, name: 'Fadi Rami', email: 'fadi.rami@gmail.com', type: 'Super Admin', status: 'Inactive' },
            { id: 18, name: 'Jalila Ahmed', email: 'jalila.ahmed@yahoo.com', type: 'Admin', status: 'Active' },
            { id: 19, name: 'Mona Saeed', email: 'mona.saeed@outlook.com', type: 'Indivisual', status: 'Inactive' },
            { id: 20, name: 'Mustafa Kamal', email: 'mustafa.k@gmail.com', type: 'Admin', status: 'Active' },
            { id: 21, name: 'Naseem Haddad', email: 'naseem.haddad@gmail.com', type: 'Super Admin', status: 'Active' },
            { id: 22, name: 'Rasha Qasim', email: 'rasha.qasim@outlook.com', type: 'Indivisual', status: 'Inactive' },
            { id: 23, name: 'Lina Adel', email: 'lina.adel@gmail.com', type: 'Admin', status: 'Active' },
            { id: 24, name: 'Wael Hussein', email: 'wael.hussein@yahoo.com', type: 'Indivisual', status: 'Active' },
            { id: 25, name: 'Kareem Ali', email: 'kareem.ali@outlook.com', type: 'Super Admin', status: 'Inactive' },
            { id: 26, name: 'Amira Said', email: 'amira.said@gmail.com', type: 'Admin', status: 'Active' },
            { id: 27, name: 'Hadi Mansour', email: 'hadi.mansour@yahoo.com', type: 'Business', status: 'Active' },
            { id: 28, name: 'Sami Khalil', email: 'sami.khalil@gmail.com', type: 'Super Admin', status: 'Inactive' },
            { id: 29, name: 'Rida Hamdan', email: 'rida.hamdan@outlook.com', type: 'Admin', status: 'Active' },
            { id: 30, name: 'Tariq Saeed', email: 'tariq.saeed@gmail.com', type: 'Business', status: 'Active' }
        
        
    ]

 

    const [records,setRecords]=useState(data);
    function handleFilter(event){
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
    function handleTypeFilter(event){
        const newData=data.filter(row=>{
            return row.type===event;
            
        })
        setRecords(newData)
    }

    

    return(
        <>
        
        <h2 className="text-center pt-3" style={{color:'#003a70'}}>Summary</h2>
        <Container>
            <Row>
                <Col>
                <span className=" col-6 col-lg-3 mx-2 my-3 text-center card-animation card-delay-1">
                            <div className="fs-6 py-3">
                                <span className="ps-3" style={{color:"#666666"}}>Total Users</span>
                            </div>
                            <div className="fs-3 pb-2 fw-bold" style={{color:'#003A70'}}>233</div>
                        </span>
                </Col>
                <Col>
                <span className=" col-6 col-lg-3 mx-2 my-3 text-center card-animation card-delay-2">
                            <div className="fs-6 py-3">
                                <span className="ps-3" style={{color:"#666666"}}>Active Users</span>
                            </div>
                            <div className="fs-3 pb-2 fw-bold text-success">45</div>
                        </span>
                </Col>
                <Col>
                <span className=" col-6 col-lg-3 mx-2 my-3 text-center  card-animation card-delay-3">
                            <div className="fs-6 py-3">
                                <span className="ps-3" style={{color:"#666666"}}>Pending Users</span>
                            </div>
                            <div className="fs-3 pb-2 fw-bold" style={{color:'#E9D62D'}}>10</div>
                        </span>
                </Col>
                <Col>
                <span className=" col-6 col-lg-3 mx-2 my-3 text-center  card-animation card-delay-4">
                            <div className="fs-6 py-3">
                                <span className="ps-3" style={{color:"#666666"}}>Blocked Users</span>
                            </div>
                            <div className="fs-3 pb-2 fw-bold text-danger" style={{color:'#003A70'}}>3</div>
                        </span>
                </Col>
            </Row>
        </Container>

       <Container fluid className="my-4 d-flex flex-wrap justify-content-around">
       <div
                className="col-12 d-flex p-2 m-0 bg-white rounded-5 justify-content-between align-items-center border border-black"
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
                  onChange={handleFilter}
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
             

    <div className="dropdown">
  <button className="btn dropdown-toggle mt-0 px-5 " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:'#E6E6E6',fontSize:'15px'}}>
    user type
  </button>
  <ul className="dropdown-menu">
  <li><a className="dropdown-item border-bottom" style={{color:'#666666',borderBottomColor:"#666666"}} href="#" onClick={() => setRecords(data)}>All</a></li>
    <li><a className="dropdown-item" href="#" onClick={() => handleTypeFilter('Admin')}>Admin</a></li>
    <li><a className="dropdown-item" href="#" onClick={() => handleTypeFilter('Super Admin')}>Super Admin</a></li>
    <li><a className="dropdown-item" href="#" onClick={() => handleTypeFilter('Indivisual')}>Indivisual</a></li>
    <li><a className="dropdown-item" href="#" onClick={() => handleTypeFilter('Business')}>Business</a></li>
  </ul>
        </div>

        <div className="dropdown">
  <button className="btn dropdown-toggle mt-0 px-5" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:'#E6E6E6',fontSize:'15px'}}>
    account status
  </button>
  <ul className="dropdown-menu">
  <li><a className="dropdown-item border-bottom" style={{color:'#666666',borderBottomColor:"#666666"}} href="#" onClick={() => setRecords(data)}>All</a></li>
    <li><a className="dropdown-item text-success" href="#" onClick={() => handleStatusFilter('Active')}>Active</a></li>
    <li><a className="dropdown-item text-danger" href="#" onClick={() => handleStatusFilter('Inactive')}>Inactive</a></li>
  </ul>
        </div>
       </Container>

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
customStyles={{
    rows: {
      style: {
        fontSize: '16px', // Adjust font size for rows
      },
    },
    headCells: {
      style: {
        fontSize: '17px', // Adjust font size for header cells
      },
    },
  }}

></DataTable>
        </div>

        <Modal show={showModal} onHide={handleModalClose} size="lg">
                <Modal.Header closeButton style={{ backgroundColor: '#003A70', color: 'white' }} className="flex justify-content-center text-center" >
                    <Modal.Title>Profile Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    <Container className="d-flex justify-content-between">
                        <Col>
                        <Row className="fw-bold mb-4">
                            <div style={{color:'#003A70'}}>User Name</div>
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
                            <div>{selectedUser.email}</div>
                        </Row>
                        <Row className="fw-bold">
                            <div style={{color:'#003A70'}}>Registration Date</div>
                            <div>5\2\2024 22:10:23</div>
                        </Row>
                        </Col>
                    </Container>
                    
                    <Container>
                    <div className="text-white p-2 mt-5 w-100 text-center rounded"  style={{backgroundColor:"#003A70"}}>Account Activity</div>
                    <div className="fw-bold mt-4">
                    
                    <div style={{color:'#003A70'}} className="my-3">Recent Logins</div>
                    <div className="fs-6 fw-light">
                    <div><Dot size={24} color="black" /><span>Oct 24, 2024 | 09:45 AM | 192.168.1.100 | Chrome on Windows</span></div>
                    <div><Dot size={24} color="black" /><span>Oct 24, 2024 | 09:45 AM | 192.168.1.100 | Chrome on Windows</span></div>
                    <div><Dot size={24} color="black" /><span>Oct 24, 2024 | 09:45 AM | 192.168.1.100 | Chrome on Windows</span></div>
                    <div><Dot size={24} color="black" /><span>Oct 24, 2024 | 09:45 AM | 192.168.1.100 | Chrome on Windows</span></div>
                    <div><Dot size={24} color="black" /><span>Oct 24, 2024 | 09:45 AM | 192.168.1.100 | Chrome on Windows</span></div>
                    
                    </div>

                    <div style={{color:'#003A70'}} className="mt-5 mb-3" >Total Auctions Participated In</div>
                    <div>25 Auctions</div>
                    <div>( <span className="text-success">15 winning bids </span> , <span className="text-danger">10 losing bids</span> )</div>
                    </div>
                    <div className="border border-bottom-black my-5"></div>

                    <div className="mb-4 d-flex justify-content-between">
                    <div className="fw-bold" style={{color:'#003A70'}}>Account Status: <span 
                            className={selectedUser.status === 'Active' ? 'text-success' : 'text-danger'}
                            style={{ fontWeight: 'bold' }}
                        >
                            {selectedUser.status}
                        </span></div>
                    <Button variant="danger">Block User</Button>
                    </div>

                    </Container>
                    
                    
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
       
           

           
       
        
        </>
    );
}
export default UsersData;
