import React, { useState,  useEffect } from "react";
import axios from "axios";
import "./Employees.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { NavLink,useParams,useLocation } from "react-router-dom";

const CreateEmployeeForm = ({ getAllEmployees }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const {pathname} = useLocation();
   const isEdit = pathname.includes(`edit`);
   const {id} = useParams();
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    dob: "",
    phone_no: "",
    country_code: "",
    address: "",
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [fieldName]: value,
    }));
  };
 console.log("edit form",id);
  useEffect( () => { const fetchEmployeeDetails = async () => {
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
    
  }, []) 
  const handleSubmit = async (e) => {
    e.preventDefault();if(isEdit){
      try{
      const accessToken = localStorage.getItem('accessToken');
      await axios.post('http://localhost:8020/api/superadmin/update-employee', newEmployee, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      getAllEmployees(); // This will refresh the employee list after creating a new employee
    } catch (error) {
      console.error('Error creating employee:', error);
    }
    }else{

    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        "http://localhost:8020/api/superadmin/create-employee",
        newEmployee,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      
      );

      getAllEmployees(); // This will refresh the employee list after creating a new employee
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <form className="create-employee-form" onSubmit={handleSubmit}>
      {/* Input fields for employee details */}
      {/* Add input fields similar to the ones in CategoriesTable component */}
      <div>
        <h2 className="HeadingForm"> New Employee Registration</h2>
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
          type="text"
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
        <label>DOB:</label>
        <input
          type="text"
          name="dob"
          value={newEmployee.dob}
          onChange={(e) => handleInputChange(e, "dob")}
          required
        />
      </div>
      <div>
        <label>phone_no:</label>
        <input
          type="text"
          name="phone_no"
          value={newEmployee.phone_no}
          onChange={(e) => handleInputChange(e, "phone_no")}
          required
        />
      </div>
      <div>
        <label>country_code:</label>
        <input
          type="text"
          name="country_code"
          value={newEmployee.country_code}
          onChange={(e) => handleInputChange(e, "country_code")}
          required
        />
      </div>
      <div>
        <label>address:</label>
        <input
          type="text"
          name="address"
          value={newEmployee.address}
          onChange={(e) => handleInputChange(e, "address")}
          required
        />
      </div>

      <div className="form-buttons">
        <button className="sub-button" type="submit">
          <NavLink to="/employee">Submit</NavLink>
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
  );
};

}
export default CreateEmployeeForm;
