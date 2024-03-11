import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/auth/Sidebar";
import Holiday from "./pages/auth/Holidays";
import Employee from "./pages/auth/Employees";
import Leaves from "./pages/auth/Leaves"
import Login from "./pages/auth/Login";
import Newemployee from "./pages/auth/CreateEmployeeForm";
import Viewemployee from "./pages/auth/Viewemployee";
//import Editemployee from "./pages/auth/Editemployee";
import Viewholiday from  "./pages/auth/Viewholiday";
import Newholiday from "./pages/auth/Newholiday";
import Newleave from "./pages/auth/Newleave";
import Viewleave from "./pages/auth/Viewleave";
// First, I want to show the login page, and after login, I want to show the sidebar.
// I want sidebar to remain constant on every page.

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/*" element={<AuthenticatedRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}
function LoginPage() {
  // login page component
  return <Login />;
}
function AuthenticatedRoutes() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/holiday" element={<Holiday />} />
        <Route path="/employee" element={<Employee />} />
        <Route path ="/employee/newemployee" element={<Newemployee />}/>
        <Route path ="/employee/edit/:id" element={<Newemployee />}/>
        <Route path ="/employee/:employeeId" element={<Viewemployee />} />
        <Route path="/viewholiday/:holidayId" element={<Viewholiday />} />
        <Route path ="/holiday/Newholiday" element={<Newholiday />}/>
        <Route path ="/leaves" element = {<Leaves/>}/>
        <Route path ="/leaves/newleave" element={<Newleave/>}/>
        <Route path ="/viewleave/:leaveRequestId" element={<Viewleave/>}/>
      </Routes>
    </>
  );
}
function Dashboard() {
  // Your dashboard component
  return <h1>Dashboard</h1>;
}
export default App;