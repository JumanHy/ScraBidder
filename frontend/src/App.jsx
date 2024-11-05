import Home from "./Pages/HomePage/Home";

// import "bootstrap/dist/css/bootstrap.min.css";
// // function App() {
//   return (
//     <>
//       <NavBar />
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/styles/css/main.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registration from "./pages/Registration";
import Login from "./pages/login";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import MultiStepForm from "./pages/Multistepform";
import ResetPasswordRequest from "./pages/ResetPasswordRequestForm";
import ResetPassword from "./pages/ResetPassword";

import Sidebar from "./pages/Sidebar";
import AcountNavbar from "./pages/AcountNavbar";
export default function App() {
  return (
    <>
      {/* <NavBar /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route index path="/" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
      
          <Route path="/multiStepForm" element={<MultiStepForm />} />
          <Route path="/reset-Password" element={<ResetPasswordRequest />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/acountnavbar" element={<AcountNavbar />} />
        
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
      

      {/* <div>
      <CustomNavbar />
      <Sidebar />
      <Route path="/userProfile" element={<UserProfile />} />
      <Footer />
    </div> */}
    </>
  );
}
