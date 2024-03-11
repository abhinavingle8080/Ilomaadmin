import React, { useState } from 'react';
import axios from 'axios';
import './Holidays.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { NavLink } from "react-router-dom";


const CreateHolidayForm = ({ getAllHolidays }) => {
    const [showCreateForm, setShowCreateForm] = useState(false); 
  const [newHoliday, setNewHoliday] = useState({
    name: '',
    date: '',
    description: '',
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setNewHoliday(prevHoliday => ({
      ...prevHoliday,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post('http://localhost:8020/api/superadmin/create-holiday', newHoliday, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      getAllHolidays(); // This will refresh the Holiday list after creating a new Holiday
    } catch (error) {
      console.error('Error creating holiday:', error);
    }
  };

  return (
    <form className="create-holiday-form" onSubmit={handleSubmit}>
      {/* Input fields for Holiday details */}
      {/* Add input fields similar to the ones in CategoriesTable component */}
      <div>
        <h2 className='HeadingForm'> New Holiday Registration</h2>
      </div>
      <div>
            <label>Name:</label>
            <input type="text" name="name" value={newHoliday.name}   onChange={(e) => handleInputChange(e, 'name')}required />
          </div>
          <div>
            <label>Date:</label>
            <input type="text" name="date" value={newHoliday.date} onChange={(e) => handleInputChange(e, 'date')} required />
          </div>
          <div>
            <label>Description:</label>
            <input type="text" name="description" value={newHoliday.description} onChange={(e) => handleInputChange(e, 'description')} required />
          </div>
          <div className="form-buttons">
          <button className="sub-button" type="submit"><NavLink to="/holiday">Submit</NavLink></button>
            <button className="cancel-button" type="button" onClick={() => setShowCreateForm(false)}><NavLink to="/holiday">Cancel</NavLink></button>
          </div>
        </form>
      )}

export default CreateHolidayForm;