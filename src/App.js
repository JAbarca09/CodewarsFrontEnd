import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserContext from "./Context/UserContext";
import useUser from "./Hooks/use-user";

function App() {
  return (
    <UserContext.Provider value={useUser()}>
      <BrowserRouter>
        {/* <LoginPage/> */}
        <Dashboard/>



        <Routes>
          {/* <Route path="/" element={<LoginPage/>} key="login"/> */}
          {/* <Route path="dashboard" element={<Dashboard/>} key="dashboard"/> */}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
