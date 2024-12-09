import "./style.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Dot } from "react-bootstrap-icons";
import axios from "axios";
//import { toast } from "react-toastify";

function UsersData() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [accountStatus, setAccountStatus] = useState("");
  const [userType, setUserType] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingUsers: 0,
    blockedUsers: 0,
  });

  const [records, setRecords] = useState([]);

  const [records2, setRecords2] = useState([]);

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5192/api/Dashboard/stats"
      );
      setUserStats({
        totalUsers: response.data.totalUsers,
        activeUsers: response.data.activeUsers,
        pendingUsers: response.data.pendingUsers,
        blockedUsers: response.data.blockedUsers,
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  
  useEffect(() => {
    fetchUserStats();
    fetchUsers();
  }, []);

  const handleModalClose = () => setShowModal(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const columns = [
    { name: "ID", selector: (row) => row.userId, sortable: true },
    {
      name: "UserName",
      selector: (row) => row.userName,
      sortable: true,
      cell: (row) => (
        <a
          href="#"
          className="user-name-link"
          onClick={() => handleUserClick(row)}
        >
          {row.userName}
        </a>
      ),
    },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "User Type", selector: (row) => row.role, sortable: true },
    {
      name: "Account Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          style={{
            color:
              row.status === "Active"
                ? "green"
                : row.status === "Pending"
                ? "blue"
                : "red",
            fontWeight: "bold",
          }}
        >
          {row.status}
        </span>
      ),
    },
  ];

  function handleFilter(event) {
    const newData = records.filter((row) => {
      return row.userName
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase());
    });

    setRecords2(newData);
  }
  function handleStatusFilter(event) {
    const newData = records?.filter((row) => {
      return row.status === event;
    });
    setRecords2(newData);
  }
  function handleTypeFilter(event) {
    console.log({ event });

    const newData = records?.filter((row) => {
      return row.role === event;
    });
    setRecords2(newData);
  }

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };
  const handleClickBlock = async () => {
    try {
      // Transform the selected rows
      const modifiedUsers = selectedRows.map((user) => {
        const { userName, email, role, ...rest } = user;
        return { ...rest, status: "Blocked" };
      });
  
      // Make the API request
      await axios.patch(
        "http://localhost:5192/api/Dashboard/update-selected-users",
        modifiedUsers
      );
  
      // Fetch updated user data
      fetchUsers();
  
      // Reset selected rows
      setSelectedRows([]);
    } catch (error) {
      console.error("Failed to update users:", error);
      // Optionally, show an error message to the user
    }
  };
  
  const handleClickActive = async () => {
    try {
      const modifiedUsers = selectedRows.map((user) => {
        const { userName, email, role, ...rest } = user;
        return { ...rest, status: "Active" };
      });
  
      // Make the API request
      await axios.patch(
        "http://localhost:5192/api/Dashboard/update-selected-users",
        modifiedUsers
      );
  
      // Fetch updated user data
      fetchUsers();
  
      // Reset selected rows
      setSelectedRows([]);
    } catch (error) {
      console.error("Failed to update users:", error);
    }
  };
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5192/api/Dashboard/all-users"
      );

      setRecords(response.data);
      setRecords2(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  

  return (
    <>
      <h2 className="text-center" style={{ color: "#003a70" }}>
        Summary
      </h2>
      <Container>
        <Row>
          <Col sm={6} lg={3} mx={2}>
            <span className="text-center card-animation card-delay-1">
              <div className="fs-6">
                <span className="ps-3" style={{ color: "#666666" }}>
                  Total Users
                </span>
              </div>
              <div className="fs-3 pb-2 fw-bold" style={{ color: "#003A70" }}>
                {userStats.totalUsers}
              </div>
            </span>
          </Col>
          <Col sm={6} lg={3} mx={2}>
            <span className="text-center card-animation card-delay-2">
              <div className="fs-6">
                <span className="ps-3" style={{ color: "#666666" }}>
                  Active Users
                </span>
              </div>
              <div className="fs-3 pb-2 fw-bold text-success">
                {userStats.activeUsers}
              </div>
            </span>
          </Col>
          <Col sm={6} lg={3} mx={2}>
            <span className="text-center card-animation card-delay-3">
              <div className="fs-6">
                <span className="ps-3" style={{ color: "#666666" }}>
                  Pending Users
                </span>
              </div>
              <div className="fs-3 pb-2 fw-bold" style={{ color: "orange" }}>
                {userStats.pendingUsers}
              </div>
            </span>
          </Col>
          <Col sm={6} lg={3} mx={2}>
            <span className="text-center card-animation card-delay-4">
              <div className="fs-6">
                <span className="ps-3" style={{ color: "#666666" }}>
                  Blocked Users
                </span>
              </div>
              <div
                className="fs-3 pb-2 fw-bold text-danger"
                style={{ color: "#003A70" }}
              >
                {userStats.blockedUsers}
              </div>
            </span>
          </Col>
        </Row>
      </Container>

      <Container fluid className="my-4 d-flex flex-wrap justify-content-around">
        <div
          className="col-12 d-flex p-2 m-0 bg-white rounded-5 justify-content-between align-items-center border border-black"
          style={{
            maxWidth: "400px",
            height: "40px",
            borderColor: "#003A70",
          }}
        >
          <input
            type="text"
            placeholder="Search by username or email"
            className="w-100 border-0 "
            style={{
              outline: "none",
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
          <button
            className="btn dropdown-toggle mt-0 px-5 "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ backgroundColor: "#E6E6E6", fontSize: "15px" }}
          >
            user type
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item border-bottom"
                style={{ color: "#666666", borderBottomColor: "#666666" }}
                href="#"
                onClick={() => setRecords2(records)}
              >
                All
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleTypeFilter("Admin")}
              >
                Admin
              </a>
            </li>

            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleTypeFilter("Indivisual")}
              >
                Indivisual
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleTypeFilter("Business")}
              >
                Business
              </a>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <button
            className="btn dropdown-toggle mt-0 px-5"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ backgroundColor: "#E6E6E6", fontSize: "15px" }}
          >
            account status
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item border-bottom"
                style={{ color: "#666666", borderBottomColor: "#666666" }}
                href="#"
                onClick={() => setRecords2(records)}
              >
                All
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-success"
                href="#"
                onClick={() => handleStatusFilter("Active")}
              >
                Active
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-primary"
                href="#"
                onClick={() => handleStatusFilter("Pending")}
              >
                Pending
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-danger "
                href="#"
                onClick={() => handleStatusFilter("Blocked")}
              >
                Blocked
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="m-5">
        <div className="d-flex justify-content-between mb-4">
          <div>
            <span className="me-3">Action</span>
            <div className="dropdown d-inline">
              <button
                className="btn dropdown-toggle mt-0 px-2 "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ backgroundColor: "#E6E6E6", fontSize: "15px" }}
              >
                select
              </button>
              <ul className="dropdown-menu">
                <li>
                  <div className="dropdown-item" onClick={handleClickBlock}>
                    Block
                  </div>
                </li>

                <li>
                  <div className="dropdown-item" onClick={handleClickActive}>
                    Activate
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={records2}
          selectableRows
          fixedHeader
          pagination
          responsive
          striped
          highlightOnHover
          selectableRowsHighlight
          onSelectedRowsChange={handleChange}
          customStyles={{
            rows: {
              style: {
                fontSize: "16px",
                borderRadius: "0 0 10px 10px",
              },
            },
            headCells: {
              style: {
                backgroundColor: "#003A70",
                color: "white",
                fontSize: "17px",
                fontWeight: "bold",
                borderRadius: "10px 10px 0 0",
              },
            },
          }}
        ></DataTable>
      </div>

      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#003A70", color: "white" }}
          className="flex justify-content-center text-center"
        >
          <Modal.Title>Profile Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Container className="d-flex justify-content-between">
              <Col>
                <Row className="fw-bold mb-4">
                  <div style={{ color: "#003A70" }}>User Name</div>
                  <div>{selectedUser.userName}</div>
                </Row>
                <Row className="fw-bold">
                  <div style={{ color: "#003A70" }}>Phone Number</div>
                  <div>077 1234567</div>
                </Row>
              </Col>
              <Col>
                <Row className="fw-bold mb-4">
                  <div style={{ color: "#003A70" }}>Email</div>
                  <div>{selectedUser.email}</div>
                </Row>
                <Row className="fw-bold">
                  <div style={{ color: "#003A70" }}>Registration Date</div>
                  <div>5\2\2024 22:10:23</div>
                </Row>
              </Col>
            </Container>

            <Container>
              <div
                className="text-white p-2 mt-5 w-100 text-center rounded"
                style={{ backgroundColor: "#003A70" }}
              >
                Account Activity
              </div>
              <div className="fw-bold mt-4">
                <div style={{ color: "#003A70" }} className="my-3">
                  Recent Logins
                </div>
                <div className="fs-6 fw-light">
                  <div>
                    <Dot size={24} color="black" />
                    <span>
                      Oct 24, 2024 | 09:45 AM | 192.168.1.100 | Chrome on
                      Windows
                    </span>
                  </div>
                  <div>
                    <Dot size={24} color="black" />
                    <span>
                      Oct 24, 2024 | 09:45 AM | 192.168.1.100 | Chrome on
                      Windows
                    </span>
                  </div>
                  <div>
                    <Dot size={24} color="black" />
                    <span>
                      Oct 24, 2024 | 09:45 AM | 192.168.1.100 | Chrome on
                      Windows
                    </span>
                  </div>
                  <div>
                    <Dot size={24} color="black" />
                    <span>
                      Oct 24, 2024 | 09:45 AM | 192.168.1.100 | Chrome on
                      Windows
                    </span>
                  </div>
                  <div>
                    <Dot size={24} color="black" />
                    <span>
                      Oct 24, 2024 | 09:45 AM | 192.168.1.100 | Chrome on
                      Windows
                    </span>
                  </div>
                </div>

                <div style={{ color: "#003A70" }} className="mt-5 mb-3">
                  Total Auctions Participated In
                </div>
                <div>25 Auctions</div>
                <div>
                  ( <span className="text-success">15 winning bids </span> ,{" "}
                  <span className="text-danger">10 losing bids</span> )
                </div>
              </div>
              <div className="border border-bottom-black my-5"></div>

              <div className="mb-4 d-flex justify-content-between">
                <div className="fw-bold" style={{ color: "#003A70" }}>
                  Account Status:{" "}
                  <span
                    className={
                      selectedUser.status === "Active"
                        ? "text-success"
                        : "text-danger"
                    }
                    style={{ fontWeight: "bold" }}
                  >
                    {selectedUser.status}
                  </span>
                </div>
                <Button variant="danger">Block User</Button>
              </div>
            </Container>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center w-100 my-3">
            <Button
              className="w-25 text-white"
              variant="secondary"
              onClick={handleModalClose}
              style={{ backgroundColor: "#B87333", borderColor: "#B87333" }}
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default UsersData;
