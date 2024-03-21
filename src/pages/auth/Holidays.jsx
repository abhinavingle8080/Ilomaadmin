import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Holidays.css";
import "@fortawesome/fontawesome-free/css/all.css";

const CategoriesTable = () => {
  const [holidays, setHolidays] = useState([]); // Corrected variable name
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState(null); // Corrected variable name
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const [newHoliday, setNewHoliday] = useState({
    id:"",
    name: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    getAllHolidays();
  }, []);

  const getAllHolidays = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:3000/api/superadmin/get-all-Holidays",
        {
          page: 1,
          limit: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setHolidays(response?.data?.data?.rows);
    } catch (error) {
      console.error("Error fetching Holidays:", error);
    }
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setNewHoliday((prevHoliday) => ({
      ...prevHoliday,
      [fieldName]: value,
    }));
  };

  //createh

  const handleDeleteConfirmation = (Holiday) => {
    setHolidayToDelete(Holiday);
    setShowDeleteConfirmation(true);
  };

  const deleteHoliday = async (holidayId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:3000/api/superadmin/delete-holiday",
        {
          holiday_id: holidayId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      getAllHolidays(); // Refresh Holiday list
    } catch (error) {
      console.error("Error deleting Holiday:", error);
    }
    setShowDeleteConfirmation(false); // Close delete confirmation modal
    setHolidayToDelete(null);
  };

  const handleViewHoliday = (Holiday) => {
    setSelectedHoliday(Holiday);
  };

  return (
    <section>
      <div className="head">
        <h3>Holidays</h3>
        {/* <link to="/holiday">Create Holiday</link> */}
        <h5> Holidays List</h5>
        <div>
          <button
            className="createCategory"
            onClick={() => setShowCreateForm(true)}
          >
            <NavLink to="/holiday/newholiday"> + Create New Holiday</NavLink>
          </button>
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
              <th>Date</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {holidays?.map((holiday, index) => (
              <tr key={holiday?.id}>
                <td>{index + 1}</td>
                <td>{holiday.name}</td>
                <td>{holiday.date}</td>
                <td>{holiday.description}</td>
                <td>
                  <NavLink
                    to={`/read/${holiday.id}`}
                    className="view-icon"
                    style={{ color: "black" }}
                  >
                    <i className="fas fa-eye"></i>
                  </NavLink>
                  <NavLink
                    to={`/holiday/edit/${holiday.id}`}
                    className="edit-icon"
                    style={{ color: "black" }}
                  >
                    <i className="fas fa-pen"></i>
                  </NavLink>
                  <span
                    className="delete-icon"
                    onClick={() => handleDeleteConfirmation(holiday)}
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
            <p>Are you sure you want to delete this Holiday?</p>
            <div>
              <button onClick={() => deleteHoliday(holidayToDelete?.id)}>
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
