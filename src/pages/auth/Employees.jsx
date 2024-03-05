import React, { useState } from 'react';
import './Employees.css'; // Make sure to create and import the CSS file
import '@fortawesome/fontawesome-free/css/all.css';

const CategoriesTable = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Function to handle delete confirmation
  const handleDeleteConfirmation = () => {
    // Logic to delete the employee if confirmed
    // Implement your delete logic here

    // Close the delete confirmation popup
    setShowDeleteConfirmation(false);
  };

  return (
    <section>
      <div className="head">
        <h3>Employees</h3>
        <h5> Employees List</h5>
        <div>
          <button className='createCategory'> + Create Employee</button>
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
            <tr>
              <td>1</td>
              <td>Ritik thakare</td>
              <td>ritikthakre@gmail.com</td>
              <td className="ac">Active</td>
              <td>
                <span className="view-icon"><i className="fas fa-eye"></i></span>
                <span className="edit-icon"><i className="fas fa-pen"></i></span>
                <span className="delete-icon" onClick={() => setShowDeleteConfirmation(true)}><i className="fas fa-trash"></i></span>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>saood</td>
              <td>saood@gmail.com</td>
              <td className="ac">Active</td>
              <td>
                <span className="view-icon"><i className="fas fa-eye"></i></span>
                <span className="edit-icon"><i className="fas fa-pen"></i></span>
                <span className="delete-icon" onClick={() => setShowDeleteConfirmation(true)}><i className="fas fa-trash"></i></span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="footer">
          <h4>Row per page :</h4>
          <select className="page">
            <option>10</option>
            <option>20</option>
          </select>
          <h4>1of 2</h4>
          <span>
            <i className="fas fa-angle-left"></i>
            <i className="fas fa-angle-right"></i>
          </span>
        </div>
      </div>
      
      {/* Delete Confirmation Popup */}
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <div className="confirmation-box">
            <p>Are you sure you want to delete this employee?</p>
            <div>
              <button onClick={handleDeleteConfirmation}>Yes</button>
              <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoriesTable;
