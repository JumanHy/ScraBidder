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

  const columns = [
    {
      name: "UserName",
      selector: (row) => row.userName,
      sortable: true,
      wrap: true,
      cell: (row) => <div className="text-primary fw-bold">{row.userName}</div>,
    },
    { name: "Email", selector: (row) => row.email, sortable: true, wrap: true },
    {
      name: "User Type",
      selector: (row) => row.role,
      sortable: true,
      wrap: true,
    },
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
            placeholder="Search by username"
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
                onClick={() => handleTypeFilter("Individual")}
              >
                Individual
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
    </>
  );
}
export default UsersData;
