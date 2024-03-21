import React, { useState, useEffect } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import { NavLink, useParams, useLocation, useNavigate } from "react-router-dom";
import "./CreateLeaveForm.css";

const CreateLeaveForm = ({ getAllLeaves }) => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { pathname } = useLocation();
  const isEdit = pathname.includes(`edit`);
  const { id } = useParams();
  const [newLeave, setNewLeave] = useState({
    leave_id: '',
    date: '',
    day: '',
    duration: '',
    reason: '',
    // status: 'pending' // Add status field and initialize it to 'pending'
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setNewLeave((prevLeave) => ({
      ...prevLeave,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `http://localhost:8020/api/superadmin/get-leave`,
          {
            leave_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setNewLeave(response?.data?.data); // Set the leave details in state
      } catch (error) {
        console.error("Error fetching leave details:", error);
      }
    };
    fetchLeaveDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (isEdit) {
        await axios.post(
          "http://localhost:8020/api/superadmin/update-leave",
          newLeave,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
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
      }
      navigate('/leaves')// This will refresh the leave list after creating/updating a leave
    } catch (error) {
      console.error("Error creating/updating leave:", error);
    }
  };

  return (
    <form className="create-leave-form">
      {/* Input fields for leave details */}
      <div>
        <h2 className="HeadingForm">{isEdit ? "Edit Leave" : "Create Leave"}</h2>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={newLeave.date}
          onChange={(e) => handleInputChange(e, "date")}
          required
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
        />
      </div>
      <div>
        <label>Status:</label>
        <select

          name="status"
          value={newLeave.status}
          onChange={(e) => handleInputChange(e, "status")}
          required >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Cancel">Rejected</option>
        </select>
      </div>

      <div>
        <label>Reason:</label>
        <input
          type="text"
          name="reason"
          value={newLeave.reason}
          onChange={(e) => handleInputChange(e, "reason")}
          required/>
      </div>
      
      

      <div className="form-buttons">
        <button className="sub-button" type="submit" onClick={handleSubmit}>
          <NavLink to="/leaves">{isEdit ? "Update" : "Submit"}</NavLink>
        </button>
        <button
          className="cancel-button"
          type="button"
          onClick={() => setShowCreateForm(false)}
        >
          <NavLink to="/leaves">Cancel</NavLink>
        </button>
      </div>
    </form>
  );
};

export default CreateLeaveForm;
