import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./pages/sidebar/Sidebar";

// Import spinner component
import Spinner from "./pages/spinner/Spinner";

// Lazy loaded components
const Login = lazy(() => import("./pages/auth/Login"));
const Holiday = lazy(() => import("./pages/holiday/Holidays"));
const Employee = lazy(() => import("./pages/emloyee/Employees"));
const Leave = lazy(() => import("./pages/leave/Leaves"));
const CreateEmployeeForm = lazy(() => import("./pages/emloyee/CreateEmployeeForm"));
const Viewemployee = lazy(() => import("./pages/emloyee/Viewemployee"));
const Newholiday = lazy(() => import("./pages/holiday/Newholiday"));
const Viewholiday = lazy(() => import("./pages/holiday/Viewholiday"));
const ViewLeave = lazy(() => import("./pages/leave/ViewLeave"));
const CreateLeaveForm = lazy(() => import("./pages/leave/CreateLeaveForm"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

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
