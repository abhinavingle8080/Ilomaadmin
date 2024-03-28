import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Employees.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link, NavLink } from "react-router-dom";
import { Breadcrumbs,TextField} from "@mui/material";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CategoriesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of current page

  useEffect(() => {
    getAllEmployees();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const getAllEmployees = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:3000/api/superadmin/get-employees",
        {
          page: currentPage,
          limit: 5,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEmployees(response?.data?.data?.rows);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleDeleteConfirmation = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteConfirmation(true);
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:3000/api/superadmin/delete-employee",
        {
          employee_id: employeeId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      getAllEmployees(); // Refresh employee list
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
    setShowDeleteConfirmation(false); // Close delete confirmation modal
    setEmployeeToDelete(null);
  };

  return (
    <section>
      <div className="head">
        <h3>Employees</h3>

        <Breadcrumbs maxItems={3} aria-label="breadcrumb" style={{color:"black"}} separator="/">
          <Link underline="hover" color="inherit" href to="/dashboard" style={{color:"black"}}>
            Dashboard
          </Link>
          <Link
          underline="none"
            color="inherit"
            style={{ color: "grey" }}
            // href="/holiday"
          >
            Employee
          </Link>
          <Link
          underline="none"
            color="inherit"
            style={{ color: "grey" }}
            // href="/holiday"
          >
            Employee list
          </Link>
        </Breadcrumbs>

        {/* <h5> Employees List</h5> */}
        <div>
          <button
            className="createCategory"
            onClick={() => setShowCreateForm(true)}
          >
            <NavLink to="/employee/newemployee"> + Create New Employee</NavLink>
          </button>
        </div>
      </div>

      <div className="table-data">
      <div className="search-bar">
          <TextField type="search" label="Search" variant="outlined" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>
                  {employee.first_name} {employee.last_name}
                </td>
                <td>{employee.email}</td>
                <td className="ac" style={{color:"green", fontWeight:"bold"}}>Active</td>
                <td>
                  <NavLink
                    to={`/employee/${employee.id}`}
                    className="view-icon"
                    style={{ color: "black" }}
                  >
                    <i className="fas fa-eye"></i>
                  </NavLink>
                  <NavLink
                    to={`/employee/edit/${employee.id}`}
                    className="edit-icon"
                    style={{ color: "black" }}
                  >
                    <i className="fas fa-pen"></i>
                  </NavLink>
                  <span
                    className="delete-icon"
                    onClick={() => handleDeleteConfirmation(employee)}
                  >
                    <i className="fas fa-trash"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="footer">
          <h4>Row per page :</h4>
          <select className="page">
            <option>5</option>
            <option>10</option>
          </select>

          <span>
            <i className="fas fa-angle-left navigate-arrow" onClick={handlePrevPage} style={{marginRight:"10px"}}></i>
            <i className="fas fa-angle-right navigate-arrow" onClick={handleNextPage}></i>
          </span>
        </div>
      </div>

      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <div className="confirmation-box">
            <p>Are you sure you want to delete this employee?</p>
            <div>
              <button onClick={() => deleteEmployee(employeeToDelete?.id)}>
                Yes
              </button>
              <button onClick={() => setShowDeleteConfirmation(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoriesTable;
