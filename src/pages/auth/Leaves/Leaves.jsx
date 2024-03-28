import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Leaves.css";
import "@fortawesome/fontawesome-free/css/all.css"; // Create a Leave.css file for styling if needed
import { Breadcrumbs, Link ,TextField } from "@mui/material";

const LeavePage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [leaveToDelete, setLeaveToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  const [newLeaveRequest, setNewLeaveRequest] = useState({
    leave_id: "",
    date: "",
    day: "",
    duration: "",
    reason: "",
    status: "",
  });

  useEffect(() => {
    getAllLeaveRequests();
  }, [currentPage]);

  const getAllLeaveRequests = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:3000/api/superadmin/get-all-leaves",
        {
          page: currentPage,
          limit: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLeaveRequests(response?.data?.data?.rows);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  

  const handleDeleteConfirmation = (leaveRequest) => {
    setLeaveToDelete(leaveRequest);
    setShowDeleteConfirmation(true);
  };

  const deleteLeaveRequest = async (leaveRequestId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://localhost:3000/api/superadmin/delete-leave",
        {
          leave_id: leaveRequestId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      getAllLeaveRequests(); // Refresh leave request list
    } catch (error) {
      console.error("Error deleting leave request:", error);
    }
    setShowDeleteConfirmation(false); // Close delete confirmation modal
    setLeaveToDelete(null);
  };

  return (
    <section>
      <div className="head">
        <h3>Leave Requests</h3>
        
        <Breadcrumbs aria-label="breadcrumb">
          <Link
          underline="none"
            color="inherit"
            // href="/holiday"
          >
            Leaves
          </Link>
          <Link
          underline="none"
            color="inherit"
            // href="/holiday"
          >
            Leaves list
          </Link>
        </Breadcrumbs>


        {/* <h5> Leaves List</h5> */}
        <div>
          <button
            className="createCategory"
            onClick={() => setShowCreateForm(true)}
          >
            <NavLink to="/leaves/newleave"> + Create New Leave Request</NavLink>
          </button>
        </div>
      </div>

      <div className="table-data">
      <div className="search-bar">
          <TextField type="search" label="Search" variant="outlined" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Duration</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests?.map((leaveRequest, index) => (
              <tr key={leaveRequest.id}>
                <td>{leaveRequest.date}</td>
                <td>{leaveRequest.day}</td>
                <td>{leaveRequest.duration}</td>
                <td>{leaveRequest.reason}</td>
                <td style={{color: leaveRequest.status === "Approved" ? "green" : leaveRequest.status === "Rejected" ? "red" : "black"  }}>{leaveRequest.status}</td>
                <td>
                  <NavLink
                    to={`/leaves/${leaveRequest.id}`}
                    className="view-icon"
                    style={{ color: "black" }}
                  >
                    <i className="fas fa-eye"></i>
                  </NavLink>
                  <NavLink
                    to={`/leaves/edit/${leaveRequest.id}`}
                    className="edit-icon"
                    style={{ color: "black" }}
                  >
                    <i className="fas fa-pen"></i>
                  </NavLink>
                  <span
                    className="delete-icon"
                    onClick={() => handleDeleteConfirmation(leaveRequest)}
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
            <i className="fas fa-angle-left navigate-arrow" onClick={handlePrevPage} style={{marginRight:"7px"}}></i>
            <i className="fas fa-angle-right navigate-arrow" onClick={handleNextPage}></i>
          </span>
        </div>
      </div>

      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <div className="confirmation-box">
            <p>Are you sure you want to delete this leave request?</p>
            <div>
              <button
                onClick={() => deleteLeaveRequest(leaveToDelete?.id)}
              >
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

export default LeavePage;
