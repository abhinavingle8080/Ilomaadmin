import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Employees.css"; // Assuming you have a CSS file for styling employees
import { NavLink, useParams, useLocation } from "react-router-dom";

const CreateEmployeeForm = ({ getAllEmployees }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { pathname } = useLocation();
  const isEdit = pathname.includes(`edit`);
  const { id } = useParams();
  const [newEmployee, setNewEmployee] = useState({
    id:"",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    dob: "",
    phone_no: "",
    country_code: "",
    address: ""
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [fieldName]: value,
    }));
  };
  

  useEffect(() => {
    if (isEdit && id) {
      const fetchEmployeeDetails = async () => {
        try {
          const accessToken = localStorage.getItem("accessToken");
          const response = await axios.post(
            `http://localhost:8020/api/superadmin/get-employee`,
            {
              employee_id: id,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          setNewEmployee(response?.data?.data?.employee); // Set the employee details in state
        } catch (error) {
          console.error("Error fetching employee details:", error);
        }
      };
      
      fetchEmployeeDetails();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      let response;
      if (isEdit) {
        response = await axios.post(
          `http://localhost:8020/api/superadmin/update-employee`,
          newEmployee,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:8020/api/superadmin/create-employee`,
          newEmployee,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      getAllEmployees(); // This will refresh the employee list after creating/editing an employee
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'creating'} employee:`, error);
    }
  };

  return (
    <div>
      {newEmployee && (
        <form className="create-employee-form">
          <div>
            <h2 className="HeadingForm">
              {" "}
              {isEdit ? "Edit Employee" : "Create Employee"}
            </h2>
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={newEmployee.first_name}
              onChange={(e) => handleInputChange(e, "first_name")}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={newEmployee.last_name}
              onChange={(e) => handleInputChange(e, "last_name")}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={(e) => handleInputChange(e, "email")}
              required
            />
          </div>
          <div>
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={newEmployee.gender}
              onChange={(e) => handleInputChange(e, "gender")}
              required
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={newEmployee.dob}
              onChange={(e) => handleInputChange(e, "dob")}
              required
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone_no"
              value={newEmployee.phone_no}
              onChange={(e) => handleInputChange(e, "phone_no")}
              required
            />
          </div>
          <div>
            <label>Country Code:</label>
            <input
              type="text"
              name="country_code"
              value={newEmployee.country_code}
              onChange={(e) => handleInputChange(e, "country_code")}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={newEmployee.address}
              onChange={(e) => handleInputChange(e, "address")}
              required
            />
          </div>
          <div className="form-buttons">
            <button className="sub-button" type="submit" onClick={handleSubmit}>
              <NavLink to="/employee">{isEdit ? "Update" : "Submit"}</NavLink>
            </button>
            <button
              className="cancel-button"
              type="button"
              onClick={() => setShowCreateForm(false)}
            >
              <NavLink to="/employee">Cancel</NavLink>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default CreateEmployeeForm;
