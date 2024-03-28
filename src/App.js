import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/auth/Sidebar/Sidebar";

// Import spinner component
import Spinner from "./pages/auth/Spinner/Spinner";

// Lazy loaded components
const Login = lazy(() => import("./pages/auth/Login/Login"));
const Holiday = lazy(() => import("./pages/auth/Holidays/Holidays"));
const Employee = lazy(() => import("./pages/auth/Employees/Employees"));
const Leave = lazy(() => import("./pages/auth/Leaves/Leaves"));
const CreateEmployeeForm = lazy(() => import("./pages/auth/Employees/CreateEmployeeForm"));
const Viewemployee = lazy(() => import("./pages/auth/Employees/Viewemployee"));
const Newholiday = lazy(() => import("./pages/auth/Holidays/Newholiday"));
const Viewholiday = lazy(() => import("./pages/auth/Holidays/viewholiday"));
const ViewLeave = lazy(() => import("./pages/auth/Leaves/ViewLeave"));
const CreateLeaveForm = lazy(() => import("./pages/auth/Leaves/CreateLeaveForm"));
const Dashboard = lazy(() => import("./pages/auth/Dashboard/Dashboard"));

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<AuthenticatedRoutes />} />
          </Routes>
        </Suspense>
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
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/holiday" element={<Holiday />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/leaves" element={<Leave />} />
          <Route path="/employee/newemployee" element={<CreateEmployeeForm />} />
          <Route path="/employee/edit/:id" element={<CreateEmployeeForm />} />
          <Route path="/employee/:employeeId" element={<Viewemployee />} />
          <Route path="/holiday/newholiday" element={<Newholiday />} />
          <Route path="/holiday/edit/:id" element={<Newholiday />} />
          <Route path="/read/:holidayId" element={<Viewholiday />} />
          <Route path="/leaves/:leaveId" element={<ViewLeave />} />
          <Route path="/leaves/newleave" element={<CreateLeaveForm />} />
          <Route path="/leaves/edit/:id" element={<CreateLeaveForm />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
