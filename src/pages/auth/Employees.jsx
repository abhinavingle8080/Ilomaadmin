import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Employees.css';
import '@fortawesome/fontawesome-free/css/all.css';

const CategoriesTable = () => {
  const [employees, setEmployees] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

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
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:8020/api/superadmin/create-employee', {
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        dob: '',
        phone_no: '',
        country_code: '',
        address: ''
      }, {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
          }
      });
      // Update the employee list after creating a new employee
      setShowCreateForm(false);
      setNewEmployee({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        dob: '',
        phone_no: '',
        country_code: '',
        address: ''
      });
      getAllEmployees(); // This will refresh the employee list

    } catch (error) {
      console.error('Error creating employee:', error);
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
          <button className='createCategory' onClick={() => setShowCreateForm(true)}> + Create New Employee</button>
        </div>
      </div>
      {showCreateForm && (
        <form className="create-employee-form" onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input type="text" name="first_name" value={newEmployee.first_name} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="last_name" value={newEmployee.last_name} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" name="email" value={newEmployee.email} onChange={handleInputChange} required />
          </div>
          <div>
            <label>Gender:</label>
            <input type="text" name="gender" value={newEmployee.gender} onChange={handleInputChange} required />
          </div>
          <div>
            <label>DOB:</label>
            <input type="text" name="dob" value={newEmployee.dob} onChange={handleInputChange} required />
          </div>
          <div>
            <label>phone_no:</label>
            <input type="text" name="phone_no" value={newEmployee.phone_no} onChange={handleInputChange} required />
          </div>
          <div>
            <label>country_code:</label>
            <input type="text" name="country_code" value={newEmployee.country_code} onChange={handleInputChange} required />
          </div>
          <div>
            <label>address:</label>
            <input type="text" name="address" value={newEmployee.address} onChange={handleInputChange} required />
          </div>

          <div className="form-buttons">
          <button className="sub-button" type="submit">Submit</button>
            <button className="cancel-button" type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
          </div>
        </form>
      )}
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
                  <span className="view-icon"><i className="fas fa-eye"></i></span>
                  <span className="edit-icon"><i className="fas fa-pen"></i></span>
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
    </section>
  );
};

export default CategoriesTable;
