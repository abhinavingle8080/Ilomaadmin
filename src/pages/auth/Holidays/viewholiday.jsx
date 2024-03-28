import React, { useState, useEffect } from "react";
import axios from "axios";
import "./viewholiday.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useParams } from "react-router-dom";

const HolidayDetails = () => {
  const { holidayId } = useParams(); // Get the holiday ID from the URL params
  const [holiday, setHoliday] = useState(null);

  useEffect(() => {
    // Fetch holiday details by ID when the component mounts
    const fetchHolidayDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          "http://localhost:3000/api/superadmin/get-holiday",
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

        setHoliday(response?.data?.data); // Set the holiday details in state
      } catch (error) {
        console.error("Error fetching holiday details:", error);
      }
    };

    fetchHolidayDetails(); // Call the fetchHolidayDetails function
  }, [holidayId]); // Make sure to include employee_id in the dependency array to re-fetch holiday details when id changes

  return (
    <section className="view-holiday-container">
      {holiday ? (
        <div className="view-holiday-details">
          <h3 className="main-heading">Holiday Details</h3>
          <div className="main">
            <p className="view-p">
              <strong>ID:</strong> {holiday.id}
            </p>
            <p  className="view-p">
              <strong>Name:</strong> {holiday.name}
            </p>
            <p  className="view-p">
              <strong>Date:</strong> {holiday.date}
            </p>
            <p className="description">
              <strong >Description:</strong> {holiday.description}
            </p>
          </div>
        </div>
      ) : (
        <p className="view-p" style={{ textAlign: "center" ,fontweight:"bold"}}>Please wait holiday data is Loading...</p>
      )}
    </section>
  );
};

export default HolidayDetails;
