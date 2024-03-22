import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Import your CSS file
import { Breadcrumbs,Link } from "@mui/material";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:3000/api/superadmin/dashboard', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setDashboardData(data?.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className="main-content">
      <main>
        <div className="page-header">
          <h1>Dashboard</h1>
          
        <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit">
            Dashboard
          </Link>
          <Link underline="hover" color="inherit" href="/employee"  style={{ color: "black" }}>
            Employee
          </Link>
          <Link underline="hover" color="inherit" href="/holiday"  style={{ color: "black" }}>
            Holiday
          </Link>
          <Link
          underline="hover"
            color="inherit"
            href="/leaves"
            style={{ color: "black" }}
          >
            Leaves
          </Link>
        </Breadcrumbs>
        </div>
        <div className="page-content">
          <div className="analytics">
            <div className="card">
              <div className="card-head">
                <h2>Total Employees</h2>
                <span className="las la-user-friends"></span>
              </div>
              <div className="card-progress">
                <div className="card-indicator">
                  {/* <div className="indicator one" style={{ width: "90%" }}></div> */}
                <small style={{fontSize:"16px",marginLeft:"12px", color:"black",paddingTop:"10px"}}>{dashboardData ? `${dashboardData.EmployeeCount} Employees` : 'Loading...'}</small>
                </div>
              </div> 
            </div>
            <div className="card">
              <div className="card-head">
                <h2>This months holiday</h2>
                <span className="las la-clipboard-list"></span>
              </div>
              <div className="card-progress">
                <div className="card-indicator ">
                  {/* <div className="indicator two" style={{ width: "70%" }}></div> */}
                <small style={{fontSize:"16px",marginLeft:"10px", color:"black" ,marginTop:"8px"}}>{dashboardData ? `${dashboardData.thisMonthHolidayCount} Holidays` : 'Loading...'}</small>
                </div>
              </div> 
            </div>
            <div className="card">
              <div className="card-head">
                <h2>Pending Leaves</h2>
                <span className="las la-hourglass-start"></span>
              </div>
              <div className="card-progress">
                <div className="card-indicator">
                  {/* <div className="indicator three" style={{ width: "60%" }}></div> */}
                <small style={{fontSize:"16px",marginLeft:"10px", color:"black" ,marginTop:"8px"}}>{dashboardData ? `${dashboardData.pendingLeaveCount} Pending Leaves` : 'Loading...'}</small>
                </div>
              </div> 
            </div>
            <div className="card">
              <div className="card-head">
                <h2>Today's Birthday</h2>
                <span className="las la-bell"></span>
              </div>
              <div className="card-progress">
                <div className="card-indicator">
                  {/* <div className="indicator four" style={{ width: "50%" }}></div> */}
              <small style={{fontSize:"16px",marginLeft:"10px", color:"black" ,marginTop:"8px"}}>{dashboardData && dashboardData.todaysBirthday ? `${dashboardData.todaysBirthday.count} Birthdays` : 'Loading...'}</small>
                </div>
              </div> 
            </div>
            <div className="card">
              <div className="card-head">
                <h2>Today's Holiday</h2>
                <span className="las la-gift"></span>
              </div>
              <div className="card-progress">
                <div className="card-indicator">
                  {/* <div className="indicator five" style={{ width: "40%" }}></div> */}
                <small style={{fontSize:"16px",marginLeft:"10px", color:"black" ,marginTop:"8px"}}>{dashboardData ? (dashboardData.isTodayHoliday ? 'Yes' : 'No') : 'Loading...'}</small>
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
