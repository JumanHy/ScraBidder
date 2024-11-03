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
import Registration from "./pages/Registration";
import BusinessRegistration from "./pages/BusinessRegistration";
import Login from "./pages/login";
import UserProfile from "./pages/UserProfile";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
export default function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route index path="/" element={<Home />} />
          <Route path="/business-register" element={<BusinessRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}
