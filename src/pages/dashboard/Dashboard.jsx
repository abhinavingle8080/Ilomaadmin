import React, { useEffect, useState } from "react";
import axios from 'axios';

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedEmployee, setSelectedEmployee] = useState(null);


    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
              const accessToken = localStorage.getItem("accessToken");
              const response = await axios.post(
                `http://localhost:8020/api/superadmin/dashboard`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                  },
                }
              ); // Assuming your backend API endpoint is /api/dashboard
                setDashboardData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const showEmployeeDetails = (employee) => {
        setSelectedEmployee(employee);
    };

    const closeEmployeeDetails = () => {
        setSelectedEmployee(null);
    };

    console.log('rows', Array.isArray(dashboardData?.todaysBirthday?.rows) );

    return (
        <div className="main-content">
            <main>
                <div className="page-header">
                    <h1>Dashboard</h1>
                    <small>Home / Dashboard</small>
                </div>
                <div className="page-content">
                    <div className="analytics">
                        {dashboardData && (
                            <>
                                <div className="card">
                                    <div className="card-head">
                                        <h2>Total Employees</h2>
                                        <span className="las la-user-friends"></span>
                                    </div>
                                    <div className="card-progress">
                                        <small>{dashboardData.EmployeeCount}</small>
                                        <div className="card-indicator">
                                            <div className="indicator" style={{ width: `${(dashboardData.EmployeeCount / 100) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-head">
                                        <h2>This month's holiday</h2>
                                        <span className="las la-user-friends"></span>
                                    </div>
                                    <div className="card-progress">
                                        <div className="card-indicator">
                                            <div className="indicator" style={{ width: `${(dashboardData.thisMonthHolidayCount / 100) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-head">
                                        <h2>Pending Leaves</h2>
                                        <span className="las la-user-friends"></span>
                                    </div>
                                    <div className="card-progress">
                                        <small>{dashboardData.pendingLeaveCount} Pending Leaves</small>
                                        <div className="card-indicator">
                                            <div className="indicator" style={{ width: `${(dashboardData.pendingLeaveCount / 5) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-head">
                                        <h2>Today's Birthday</h2>
                                        <span className="las la-user-friends"></span> </div>
                                    <div className="card-progress" > 
                                    {/* <button><small>{dashboardData.todaysBirthday.count} Today's Birthday</small></button> */}
                                    {Array.isArray(dashboardData?.todaysBirthday?.rows) ? (
                                            dashboardData?.todaysBirthday?.rows?.map((employee, index) => (
                                                <div key={index} className="employee-item" onClick={() => showEmployeeDetails(employee)}>
                                                    <p>{employee.first_name} {employee.last_name}</p>
                                                    <p>Employee ID: {employee.id}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No birthday data available</p>
                                        )}
                                        <div className="card-indicator">
                                            <div className="indicator" style={{ width: `${(dashboardData.todaysBirthday.count / 100) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    </div>
                              
                                <div className="card">
                                    <div className="card-head">
                                        <h2>Today's Holiday</h2>
                                        <span className="las la-user-friends"></span>
                                    </div>
                                    <div className="card-progress">
                                        <div className="card-indicator">
                                            <div className="indicator" style={{ width: `${(dashboardData.isTodayHoliday ? 100 : 0)}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
            {selectedEmployee && (
                <div className="employee-details-modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeEmployeeDetails}>&times;</span>
                        <h2>Employee Birthday</h2>
                        <p>First Name: {selectedEmployee.firstName}</p>
                        <p>Last Name: {selectedEmployee.lastName}</p>
                        <p>Employee ID: {selectedEmployee.employeeId}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
