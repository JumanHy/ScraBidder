import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./Pages/HomePage/Home";
import Footer from "./components/Footer/Footer";
import "./styles/css/main.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Pages/Dashboard/Dashboard";

export default function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
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