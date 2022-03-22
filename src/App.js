import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <LoginPage/> */}
        <Dashboard/>



        <Routes>
          {/* <Route path="/" element={<LoginPage/>} key="login"/> */}
          {/* <Route path="dashboard" element={<Dashboard/>} key="dashboard"/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
