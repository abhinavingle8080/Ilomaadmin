import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/auth/Sidebar";
import Holiday from "./pages/auth/Holidays";
import Employee from "./pages/auth/Employees";
import Login from "./pages/auth/Login";
import Newemployee from "./pages/auth/Newemployee";
import Viewemployee from "./pages/auth/Viewemployee";

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
        <Route path ="/employee/:employeeId" element={<Viewemployee />} />
      </Routes>
    </>
  );
}
function Dashboard() {
  // Your dashboard component
  return <h1>Dashboard</h1>;
}
export default App;