import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employees.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { NavLink } from "react-router-dom";


const CategoriesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [showBirthdayPopup, setShowBirthdayPopup] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    dob: '',
    phone_no: '',
    country_code: '',
    address: ''
  });

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:8020/api/superadmin/get-employees', {
        page: 1,
        limit: 10
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      setEmployees(response?.data?.data?.rows);
      const today = new Date().toISOString().slice(5, 10); // Get today's date (MM-DD)
            const employeesWithBirthdayToday = response?.data?.data?.rows.filter(employee => {
                const birthday = new Date(employee.dob).toISOString().slice(5, 10);
                return birthday === today;
            });
            if (employeesWithBirthdayToday.length > 0) {
              setShowBirthdayPopup(true);
          }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

 
  

  const handleDeleteConfirmation = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteConfirmation(true);
  };

  const deleteEmployee = async (employeeId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post('http://localhost:8020/api/superadmin/delete-employee', {
            employee_id: employeeId,
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
      getAllEmployees(); // Refresh employee list
    } 
    catch (error) {
      console.error('Error deleting employee:', error);
    }
    setShowDeleteConfirmation(false); // Close delete confirmation modal
    setEmployeeToDelete(null);
  };

  return (
    <section>
      <div className="head">
        <h3>Employees</h3>
        <h5> Employees List</h5>
        <div>
          <button className='createCategory' onClick={() => setShowCreateForm(true)}  ><NavLink to="/employee/newemployee"> + Create New Employee</NavLink></button>
        </div>
      </div>
      
      <div className="table-data">
        <div className="search-bar">
          <input type="search" name="search" placeholder="Search ..." />
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
                <td>{employee.first_name} {employee.last_name}</td>
                <td>{employee.email}</td>
                <td className="ac">Active</td>
                <td>
                  < NavLink to ={`/employee/${employee.id}`} className="view-icon" style={{ color: 'black'}}><i className="fas fa-eye"></i></NavLink>
                  < NavLink to ={`/employee/edit/${employee.id}`} className="edit-icon" style={{ color: 'black'}}><i className="fas fa-pen"></i></NavLink>
                  <span className="delete-icon" onClick={() => handleDeleteConfirmation(employee)}><i className="fas fa-trash"></i></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="footer">
          <h4>Row per page :</h4>
          <select className="page">
            <option>10</option>
            <option>20</option>
          </select>

          <span>
            <i className="fas fa-angle-left"></i>
            <i className="fas fa-angle-right"></i>
          </span>
        </div>
      </div>

      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <div className="confirmation-box">
            <p>Are you sure you want to delete this employee?</p>
            <div>
              <button onClick={() => deleteEmployee (employeeToDelete?.id)}>Yes</button>
              <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
         {showBirthdayPopup && (
                <div className="birthday-popup">
                    <h3>Today is the birthday of:</h3>
                    <ul>
                        {employees.map(employee => (
                            <li key={employee.id}>{employee.first_name} {employee.last_name}</li>
                        ))}
                    </ul>
                </div>
            )}
    </section>
  );
};

export default CategoriesTable;
