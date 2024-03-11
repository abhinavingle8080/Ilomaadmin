// LeaveDetails.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Viewleave.css"; // Assuming you have a CSS file named ViewLeave.css
import "@fortawesome/fontawesome-free/css/all.css";
import { useParams } from "react-router-dom";

const LeaveDetails = () => {
  const { leaveId } = useParams(); // Get the leave ID from the URL params
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    // Fetch leave details by ID when the component mounts
    const fetchLeaveDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          "http://localhost:8020/api/superadmin/get-leave",
          {
            leave_id: leaveId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        setLeave(response?.data?.data); // Set the leave details in state
      } catch (error) {
        console.error("Error fetching leave details:", error);
      }
    };

    fetchLeaveDetails(); // Call the fetchLeaveDetails function
  }, [leaveId]); // Make sure to include leaveId in the dependency array to re-fetch leave details when it changes

  return (
    <section className="leave-details">
      {leave ? (
        <div className="main">
          <h3 className="main-heading">Leave Details</h3>
          <div className="main">
            <p className="view-p">
              <strong>ID:</strong> {leave.id}
            </p>
            <p className="view-p">
              <strong>Date:</strong> {leave.date}
            </p>
            <p className="view-p">
              <strong>Day:</strong> {leave.day}
            </p>
            <p className="view-p">
              <strong>Duration:</strong> {leave.duration}
            </p>
            <p className="description">
              <strong>Reason:</strong> {leave.reason}
            </p>
          </div>
        </div>
      ) : (
        <p className="view-p">Loading...</p>
      )}
    </section>
  );
};

export default LeaveDetails;
