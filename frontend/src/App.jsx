import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
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

export default function App() {
  return (
    <>
      <Router>
        <ConditionalNavBar />
        <Container style={{ marginTop: "76px" }} fluid className="p-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auction" element={<AuctionDetailsPage />} />
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
            {/* <Route path="/profile" element={<UserProfile />} /> */}
            {/* //<Route path="/bprofile" element={<BusinessProfile />} /> */}
            <Route path="/cprofile" element={<Companyprofile />} />
            <Route path="/user-account" element={<UserAccount />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/business-account" element={<BusinessAccount />} />
            <Route path="/auction-form" element={<AuctionForm />} />
          </Routes>{" "}
        </Container>
        <ConditionalFooter />
      </Router>
    </>
  );
}

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
const ConditionalNavBar = () => {
  const location = useLocation();
  const hideNavBarRoutes = ["/dashboard"];

  return !hideNavBarRoutes.includes(location.pathname) ? <NavBar /> : null;
};
