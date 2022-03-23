import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <LoginPage/> */}
        <Dashboard/>
        {/* <AdminDashboard/> */}



        <Routes>
          {/* <Route path="/" element={<LoginPage/>} key="login"/> */}
          {/* <Route path="dashboard" element={<Dashboard/>} key="dashboard"/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
