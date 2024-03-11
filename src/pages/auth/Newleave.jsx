// LeaveForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "./Employees.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { NavLink } from "react-router-dom";

const LeaveForm = ({ getAllLeaves }) => {
  const [newLeave, setNewLeave] = useState({
    date: "",
    day: "",
    duration: "",
    reason: "",
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setNewLeave((prevLeave) => ({
      ...prevLeave,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        "http://localhost:8020/api/superadmin/create-leave",
        newLeave,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      getAllLeaves(); // This will refresh the leave list after creating a new leave
    } catch (error) {
      console.error("Error creating leave:", error);
    }
  };

  return (
    <form className="create-employee-form" onSubmit={handleSubmit}>
      <div>
        <h2 className="HeadingForm"> New Leave Application</h2>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="text"
          name="date"
          value={newLeave.date}
          onChange={(e) => handleInputChange(e, "date")}
          required
          className="leave-input"
        />
      </div>
      <div>
        <label>Day:</label>
        <input
          type="text"
          name="day"
          value={newLeave.day}
          onChange={(e) => handleInputChange(e, "day")}
          required
          className="leave-input"
        />
      </div>
      <div>
        <label>Duration:</label>
        <input
          type="text"
          name="duration"
          value={newLeave.duration}
          onChange={(e) => handleInputChange(e, "duration")}
          required
          className="leave-input"
        />
      </div>
      <div>
        <label>Reason:</label>
        <input
          type="text"
          name="reason"
          value={newLeave.reason}
          onChange={(e) => handleInputChange(e, "reason")}
          required
          className="leave-input"
        />
      </div>

      <div className="form-buttons">
        <button className="sub-button" type="submit">
          <NavLink to="/leaves">Submit</NavLink>
        </button>
        <button className="cancel-button" type="button">
          <NavLink to="/leaves">Cancel</NavLink>
        </button>
      </div>
    </form>
  );
};

export default LeaveForm;
