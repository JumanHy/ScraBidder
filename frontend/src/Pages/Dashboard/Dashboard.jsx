import DashNav from "@/components/DashNav/DashNav";
import SideBar from "@/components/SideBar/SideBar";
import { Alert, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const userRole = localStorage.getItem("role");

  const navigate = useNavigate();
  if (userRole != "Admin") {
    return (
      <Container
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: "100vh", textAlign: "center" }}
      >
        <Alert variant="danger" className="w-50">
          <h4 className="mb-3">Access Denied</h4>
          <p className="mb-3">
            You do not have the necessary permissions to access this page.
          </p>
        </Alert>
        <Button variant="primary" onClick={() => navigate("/")}>
          Go Back to Home
        </Button>
      </Container>
    );
  }
  return (
    <>
      <DashNav />
      <SideBar />
    </>
  );
}

export default Dashboard;
