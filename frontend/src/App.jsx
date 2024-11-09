import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AuctionDetailsPage from "./pages/AuctionDetailsPage/AuctionDetailsPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import Home from "./Pages/HomePage/Home";

import "./styles/css/main.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./components/Footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Pages/Login.jsx";

import BusinessRegistration from "./Pages/BusinessRegistration.jsx";
import ResetPasswordRequest from "./pages/ResetPasswordRequestForm";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";
import BusinessAccount from "./Pages/BusinessAccount/BusinessAccount.jsx";
import IndividualRegistration from "./Pages/IndividualRegistration.jsx";

export default function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auction" element={<AuctionDetailsPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/individual-register"
            element={<IndividualRegistration />}
          />
          <Route path="/business-register" element={<BusinessRegistration />} />
          <Route path="/reset-Password" element={<ResetPasswordRequest />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/user-account" element={<UserProfile />} />
          <Route path="/business-account" element={<BusinessAccount />} />
        </Routes>
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
  ];

  return !hideFooterRoutes.includes(location.pathname) ? <Footer /> : null;
};
