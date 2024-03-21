import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewLeave.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useParams } from "react-router-dom";

const ViewLeave = () => {
  const { leaveId } = useParams(); // Get the leave ID from the URL params
  const [leave, setLeave] = useState(null);

  useEffect(() => {
    // Fetch leave details by ID when the component mounts
    const fetchLeaveDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `http://localhost:3000/api/superadmin/get-leave`,
          {
            leave_id:leaveId,
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
  }, [leaveId]); // Make sure to include leaveId in the dependency array to re-fetch leave details when id changes

  return (
    <section className="view-leave-container">
      {leave ? (
        <div className="view-leave-details">
          <h3>Leave Details</h3>
          <div>
            <p>
              <strong>ID:</strong> {leave.id}
            </p>
            <p>
              <strong>Date:</strong> {leave.date}
            </p>
            <p>
              <strong>Day:</strong> {leave.day}
            </p>
            <p>
              <strong>Duration:</strong> {leave.duration}
            </p>
           
            <p>
              <strong>Reason:</strong> {leave.reason}
            </p>
          </div>
        </div>
      ) : (
        <p className="loading"style={{ textAlign: "center" ,fontweight:"bold"}}>Please wait leave data is Loading...</p>
      )}
    </section>
  );
};

export default ViewLeave;
