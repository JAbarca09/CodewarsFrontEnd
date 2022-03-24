import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import CreateAccount from "./Pages/CreateAccount";
import AdminCreateCohort from "./Pages/AdminCreateCohort";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserContext from "./Context/UserContext";
import ReserveContext from "./Context/ReserveContext";
import useUser from "./Hooks/use-user";
import useReserve from "./Hooks/use-reserve";

function App() {
  return (
    <UserContext.Provider value={useUser()}>
      <ReserveContext.Provider value={useReserve()}>
      <BrowserRouter>
        {/* <LoginPage/> */}
        {/* <Dashboard/> */}
        {/* <AdminDashboard/> */}
        {/* <CreateAccount/> */}
        {/* <AdminCreateCohort/> */}



        <Routes>
          <Route path="login" element={<LoginPage/>} key="login"/>
          <Route path="dashboard" element={<Dashboard/>} key="dashboard"/>
          <Route path="creataccount" element={<CreateAccount/>} key="creataccount"/>
          <Route path="createcohort" element={<AdminCreateCohort/>} key="createcohort"/>
        </Routes>
      </BrowserRouter>
      </ReserveContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
