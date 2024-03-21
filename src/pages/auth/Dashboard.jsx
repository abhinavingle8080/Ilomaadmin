import React, { useEffect } from "react";
import "./Dashboard.css"; // Import your CSS file
// import { useNavigate } from "react-router-dom";

function Dashboard() {
    // const navigate = useNavigate();

    // useEffect(() => {
    // //   const accessToken = localStorage.getItem("accessToken");
    //   if (!localStorage.getItem("accessToken")) {
    //     navigate("/");
    //   }
    // },[])

  return (
    <div className="main-content">
      <main>
        <div className="page-header">
          <h1>Dashboard</h1>
          <small>Home / Dashboard</small>
        </div>
        <div className="page-content">
          <div className="analytics">
            <div className="card">
              <div className="card-head">
                <h2>Total Employees</h2>
                {/* <h2>50</h2> */}
                <span className="las la-user-friends"></span>
              </div>
              <div className="card-progress">
                <small>100 Employees</small>
                <div className="card-indicator">
                  <div className="indicator one" style={{ width: "90%" }}></div>
                </div>
              </div> 
            </div>
            <div className="card">
              <div className="card-head">
                <h2>This months holiday</h2>
                <span className="las la-user-friends"></span>
              </div>
              <div className="card-progress">
                {/* <small>User activity this month</small> */}
                <div className="card-indicator">
                  <div className="indicator two" style={{ width: "70%" }}></div>
                </div>
              </div> 
            </div>
            <div className="card">
              <div className="card-head">
                <h2>Pending Leaves</h2>
                <span className="las la-user-friends"></span>
              </div>
              <div className="card-progress">
                <small>5 Pending Leaves</small>
                <div className="card-indicator">
                  <div className="indicator three" style={{ width: "60%" }}></div>
                </div>
              </div> 
            </div>
            <div className="card">
              <div className="card-head">
                <h2>Today's Birthday</h2>
                <span className="las la-user-friends"></span>
              </div>
              <div className="card-progress">
                <small>User activity this month</small>
                <div className="card-indicator">
                  <div className="indicator four" style={{ width: "50%" }}></div>
                </div>
              </div> 
            </div>
            <div className="card">
              <div className="card-head">
                <h2>Today's Holiday</h2>
                <span className="las la-user-friends"></span>
              </div>
              <div className="card-progress">
                <small>User activity this month</small>
                <div className="card-indicator">
                  <div className="indicator five" style={{ width: "40%" }}></div>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
