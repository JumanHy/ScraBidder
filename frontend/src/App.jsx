import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AuctionDetailsPage from "./pages/AuctionDetailsPage/AuctionDetailsPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import Home from "./Pages/HomePage/Home";
 //import  SearchBar  from "./components/SearchBar";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/main.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./components/Footer/Footer";

import "../src/styles/css/main.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./pages/Registration";
import Login from "./pages/login";

import MultiStepForm from "./pages/Multistepform";
import ResetPasswordRequest from "./pages/ResetPasswordRequestForm";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";
import BusinessProfile from "./pages/BusinessProfile/BusinessProfile";
import New from"./pages/New";
import Companyprofile from "./pages/Companyprofile/Companyprofile"
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
          <Route path="/register" element={<Registration />} />
          <Route path="/multiStepForm" element={<MultiStepForm />} />
          <Route path="/reset-Password" element={<ResetPasswordRequest />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/bprofile" element={<BusinessProfile />} />
          <Route path="/cprofile" element={<Companyprofile />} />
          <Route path="/new" element={<New />}/>
        </Routes>
        
        {/* <Footer />; */}
      </Router>
      
    </>
  );
}
