import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./pages/auth/Sidebar";
import Holiday from "./pages/auth/Holidays";
import Employee from "./pages/auth/Employees";
import Leaves from "./pages/auth/Leaves";
import Login from "./pages/auth/Login";
import CreateEmployeeForm from "./pages/auth/CreateEmployeeForm";
import Viewemployee from "./pages/auth/Viewemployee";
import Viewholiday from "./pages/auth/Viewholiday";
import Newholiday from "./pages/auth/Newholiday";
import ViewLeave from "./pages/auth/ViewLeave";
import CreateLeaveForm from "./pages/auth/CreateLeaveForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage handleLogin={handleLogin} />} />
          <Route path="/*" element={isLoggedIn ? <AuthenticatedRoutes handleLogout={handleLogout} /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

function LoginPage({ handleLogin }) {
  // login page component
  return <Login handleLogin={handleLogin} />;
}

function AuthenticatedRoutes({ handleLogout }) {
  return (
    <>
      <Sidebar handleLogout={handleLogout} />
      <Routes>
        <Route path="/holiday" element={<Holiday />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/newemployee" element={<CreateEmployeeForm />} />
        <Route path="/employee/edit/:id" element={<CreateEmployeeForm />} />
        <Route path="/employee/:employeeId" element={<Viewemployee />} />
        <Route path="/viewholiday/:holidayId" element={<Viewholiday />} />
        <Route path="/holiday/Newholiday" element={<Newholiday />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/leaves/newleave" element={<CreateLeaveForm />} />
        <Route path="/leaves/edit/:id" element={<CreateLeaveForm />} />
        <Route path="/leaves/:leaveId" element={<ViewLeave />} />
      </Routes>
    </>
  );
}

export default App;
