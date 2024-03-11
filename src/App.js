import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/auth/Sidebar";
import Holiday from "./pages/auth/Holidays";
import Employee from "./pages/auth/Employees";
import Login from "./pages/auth/Login";
import Read from  "./pages/auth/read";
import Newholiday from "./pages/auth/Newholiday"

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
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/holiday" element={<Holiday />} />
        <Route path="/employee" element={<Employee />} />
        <Route path ="/holiday/newholiday" element={<Newholiday />}/>
        <Route path="/read/:holidayId" element={<Read />} />
      </Routes>
    </>
  );
}
function Dashboard() {
  // Your dashboard component
  return <h1>Dashboard</h1>;
}
export default App;