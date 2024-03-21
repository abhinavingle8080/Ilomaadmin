import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Viewemployee.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { employeeId } = useParams(); // Get the employee ID from the URL params
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch employee details by ID when the component mounts
    const fetchEmployeeDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `http://localhost:3000/api/superadmin/get-employee`,
          {
            employee_id:employeeId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        setEmployee(response?.data?.data?.employee); // Set the employee details in state
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails(); // Call the fetchEmployeeDetails function
  }, [employeeId]); // Make sure to include id in the dependency array to re-fetch employee details when id changes

  return (
    <section className="view-employee-container">
      {employee ? (
        <div className="view-employee-details">
          <h3>Employee Details</h3>
          <div>
            <p>
              <strong>ID:</strong> {employee.id}
            </p>
            <p>
              <strong>First Name:</strong> {employee.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {employee.last_name}
            </p>
            <p>
              <strong>Email:</strong> {employee.email}
            </p>
            <p>
              <strong>Gender:</strong> {employee.gender}
            </p>
            <p>
              <strong>DOB:</strong> {employee.dob}
            </p>
            <p>
              <strong>Phone Number:</strong> {employee.phone_no}
            </p>
            <p>
              <strong>Country Code:</strong> {employee.country_code}
            </p>
            <p>
              <strong>Address:</strong> {employee.address}
            </p>
          </div>
        </div>
      ) : (
        <p className="loading" style={{ textAlign: "center" ,fontweight:"bold"}}>Please wait employee data is Loading...</p>
      )}
    </section>
  );
};

export default EmployeeDetails;