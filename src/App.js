import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./pages/auth/Sidebar";
import Holiday from "./pages/auth/Holidays";
import Employee from "./pages/auth/Employees";
import Leaves from "./pages/auth/Leaves"
import Login from "./pages/auth/Login";
import CreateEmployeeForm from "./pages/auth/CreateEmployeeForm";
import Viewemployee from "./pages/auth/Viewemployee";
//import Editemployee from "./pages/auth/Editemployee";
import Viewholiday from  "./pages/auth/Viewholiday";
import Newholiday from "./pages/auth/Newholiday";
import Newleave from "./pages/auth/CreateLeaveForm";
import Viewleave from "./pages/auth/Viewleave";
import CreateLeaveForm from "./pages/auth/CreateLeaveForm";

//const isloggedin = true;


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
        <Route path ="/employee/newemployee" element={<CreateEmployeeForm />}/>
        <Route path ="/employee/edit/:id" element={<CreateEmployeeForm />}/>
        <Route path ="/employee/:employeeId" element={<Viewemployee />} />
        <Route path="/viewholiday/:holidayId" element={<Viewholiday />} />
        <Route path ="/holiday/Newholiday" element={<Newholiday />}/>
        <Route path ="/leaves" element = {<Leaves/>}/>
        <Route path ="/leaves/newleave" element={<Newleave/>}/>
        <Route path ="/leaves/:leaveId" element={<Viewleave/>}/>
        <Route path ="/leaves/edit/:id" element={<CreateLeaveForm/>}/>
      </Routes>
    </>
  );
}
function Dashboard() {
  // Your dashboard component
  return <h1>Dashboard</h1>;
}
export default App;