import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Holidays.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { NavLink, useParams, useLocation } from "react-router-dom";

const CreateHolidayForm = ({ getAllHolidays }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { pathname } = useLocation();
  const isEdit = pathname.includes(`edit`);
  const { id } = useParams();
  const [newHoliday, setNewHoliday] = useState({
    Id:"",
    name: "",
    date: "",
    description: "",
  });

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setNewHoliday((prevHoliday) => ({
      ...prevHoliday,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    const fetchHolidayDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `http://localhost:3000/api/superadmin/get-holiday`,
          {
            holiday_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("Holiday Details Response:", response);

        setNewHoliday(response?.data?.data); // Set the holiday details in state
      } catch (error) {
        console.error("Error fetching holiday details:", error);
      }
    };

    fetchHolidayDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await axios.post(
          `http://localhost:3000/api/superadmin/update-holiday`,
          newHoliday,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        getAllHolidays(); // This will refresh the Holiday list after creating a new Holiday
      } catch (error) {
        console.error("Error creating holiday:", error);
      }
    } else {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await axios.post(
          `http://localhost:3000/api/superadmin/create-holiday`,
          newHoliday,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        getAllHolidays(); // This will refresh the Holiday list after creating a new Holiday
      } catch (error) {
        console.error("Error creating holiday:", error);
      }
    }
  };

  return (
    <div>
      {newHoliday && (
        <form className="create-holiday-form">
          <div>
            <h2 className="HeadingForm">
              {" "}
              {isEdit ? "Edit Holiday" : "Create Holiday"}
            </h2>
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newHoliday.name}
              onChange={(e) => handleInputChange(e, "name")}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={newHoliday.date}
              onChange={(e) => handleInputChange(e, "date")}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={newHoliday.description}
              onChange={(e) => handleInputChange(e, "description")}
              required
            />
          </div>
          <div className="form-buttons">
            <button className="sub-button" type="submit" onClick={handleSubmit}>
              <NavLink to="/holiday">{isEdit ? "Update" : "Submit"}</NavLink>
            </button>
            <button
              className="cancel-button"
              type="button"
              onClick={() => setShowCreateForm(false)}
            >
              <NavLink to="/holiday">Cancel</NavLink>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default CreateHolidayForm;
