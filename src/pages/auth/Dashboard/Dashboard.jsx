import React, { useEffect, useState } from "react";
import "./Dashboard.css"; // Import your CSS file
import { Breadcrumbs,Link } from "@mui/material";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [showNames, setShowNames] = useState(false);
  const [showHolidays, setShowHolidays] = useState(false);

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

  const handleBirthdayClick = () => {
    setShowNames(true); 
  };

  const handleHolidayClick = () => {
    setShowHolidays(true); 
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
                {/* <div className="card-indicator"> */}
                  {/* <div className="indicator one" style={{ width: "90%" }}></div> */}
                <small style={{fontSize:"15px",marginLeft:"12px", color:"black",paddingTop:"10px"}}>{dashboardData ? `${dashboardData.EmployeeCount} Employees` : 'Loading...'}</small>
                {/* </div> */}
              </div> 
            </div>
            <div className="card" onClick={handleHolidayClick}>
            <div className="card-head">
              <h2 style={{fontSize:"28px"}}>This month's holiday</h2>
              <span className="las la-clipboard-list"></span>
            </div>
            <div className="card-progress">
              {/* <div className="card-indicator"> */}
              <small style={{fontSize:"15px",marginLeft:"10px", color:"black" ,marginTop:"8px"}}>
                {dashboardData ? `${dashboardData.thisMonthHolidayCount} Holidays` : 'Loading...'}
              </small>

              {/* </div> */}
            </div> 
          </div>
            <div className="card">
              <div className="card-head">
                <h2>Pending Leaves</h2>
                <span className="las la-hourglass-start"></span>
              </div>
              <div className="card-progress">
                {/* <div className="card-indicator"> */}
                  {/* <div className="indicator three" style={{ width: "60%" }}></div> */}
                <small style={{fontSize:"15px",marginLeft:"10px", color:"black" ,marginTop:"8px"}}>{dashboardData ? `${dashboardData.pendingLeaveCount} Pending Leaves` : 'Loading...'}</small>
                {/* </div> */}
              </div> 
            </div>

            <div className="card" onClick={handleBirthdayClick}>
            <div className="card-head">
              <h2>Today's Birthday</h2>
              <span className="las la-gift"></span>
            </div>
            <div className="card-progress">
              {/* <div className="card-indicator"> */}
                <small style={{fontSize:"15px",marginLeft:"10px", color:"black" ,marginTop:"8px"}}>
                  {dashboardData && dashboardData.todaysBirthday ? `${dashboardData.todaysBirthday.count} Birthdays` : 'Loading...'}
                </small>
              {/* </div> */}
            </div> 
          </div>


            <div className="card">
              <div className="card-head">
                <h2>Today's Holiday</h2>
                <span className="las la-clipboard-list"></span>
              </div>
              <div className="card-progress">
                {/* <div className="card-indicator"> */}
                  {/* <div className="indicator five" style={{ width: "40%" }}></div> */}
                <small style={{fontSize:"15px",marginLeft:"10px", color:"black" ,marginTop:"8px"}}>{dashboardData ? (dashboardData.isTodayHoliday ? 'Yes' : 'No') : 'Loading...'}</small>
                {/* </div> */}
              </div> 
            </div>
          </div>
        </div>

        <div>
        {showNames && (
        <div className="card-birthday" style={{marginTop:"20px" , width:"50%"}}>
          <h2>Employee's Birthday</h2>
          <ol type="1" className="list" style={{marginTop:"18px",marginBottom:"20px" ,fontWeight:"bold"}}>
            {dashboardData && dashboardData.todaysBirthday && dashboardData.todaysBirthday.rows.map(employee => (
              <li key={employee.id} onClick={() => handleBirthdayClick(`${employee.first_name} ${employee.last_name}`)}>
                {`🎂${employee.first_name} ${employee.last_name}`}
              </li>
            ))}
          </ol>
        </div>
      )}
      </div>

      <div>
      {showHolidays && (
          <div>
            <h3>List of Holidays</h3>
            <ol type="1" className="list" style={{marginTop:"18px",marginBottom:"20px" ,fontWeight:"bold"}}>
              {dashboardData && dashboardData.holidays && dashboardData.holidays.map(holiday => (
                <li key={holiday.id} onClick={() => handleHolidayClick(`${holiday.name}`)}>
                  {holiday.name}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      </main>
    </div>
  );
}

export default Dashboard;
