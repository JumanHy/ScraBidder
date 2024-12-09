import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuctionDetailsPage from "./Pages/AuctionDetailsPage/AuctionDetailsPage";
import ResultsPage from "./Pages/ResultsPage/ResultsPage";
import NavBar from "./components/NavBar/NavBar";
import Home from "./Pages/HomePage/Home";
import Login from "./Pages/Login.jsx";
import BusinessRegistration from "./Pages/BusinessRegistration.jsx";
import ResetPasswordRequest from "./pages/ResetPasswordRequestForm";
import ResetPassword from "./pages/ResetPassword";
import UserAccount from "./Pages/UserAccount.jsx";
import Companyprofile from "./pages/Companyprofile/Companyprofile";
import BusinessAccount from "./pages/BusinessAccount/BusinessAccount.jsx";
import IndividualRegistration from "./Pages/IndividualRegistration.jsx";
import AuctionForm from "./Pages/AuctionFormPage/AuctionFormPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";

import "./styles/css/main.min.css";
import Table from "./Pages/Table";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <Router>
        <ConditionalNavBar isAuthenticated={isAuthenticated} />
        <Container style={{ marginTop: "76px" }} fluid className="p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auction/:auctionId"
              element={<AuctionDetailsPage />}
            />

            <Route path="/results" element={<ResultsPage />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/individual-register"
              element={<IndividualRegistration />}
            />
            <Route
              path="/business-register"
              element={<BusinessRegistration />}
            />
            <Route path="/reset-Password" element={<ResetPasswordRequest />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/cprofile" element={<Companyprofile />} />
            <Route path="/user-account" element={<UserAccount />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/business-account" element={<BusinessAccount />} />
            <Route path="/auction-form" element={<AuctionForm />} />
            {/* Logout route */}
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Container>
        <ConditionalFooter />
      </Router>
    </>
  );
}

// Footer visibility based on route
const ConditionalFooter = () => {
  const location = useLocation();
  const hideFooterRoutes = [
    "/login",
    "/individual-register",
    "/business-register",
    "/reset-password",
    "/resetPassword",
    "/business-account",
    "/user-account",
    "/dashboard",
  ];

  return !hideFooterRoutes.includes(location.pathname) ? <Footer /> : null;
};

// NavBar visibility based on route and authentication
const ConditionalNavBar = ({ isAuthenticated }) => {
  const location = useLocation();
  const hideNavBarRoutes = ["/dashboard"];

  // Only show the NavBar on routes that don't include "/dashboard" and show it according to authentication state
  return !hideNavBarRoutes.includes(location.pathname) &&
    isAuthenticated !== null ? (
    <NavBar isAuthenticated={isAuthenticated} />
  ) : null;
};

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return null; // Or a loading spinner while processing the logout
};
