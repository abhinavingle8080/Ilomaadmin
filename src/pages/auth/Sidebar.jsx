import React from 'react';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import './Sidebar.css'; // Import your CSS file
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink and useNavigate
import { useEffect } from 'react';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate("/login"); 
  };

  return (
    <div>
      <input type="checkbox" id="menu-toggle" />
      <div className="sidebar">
        <div className="side-header">
          <h3>i<span>loma</span></h3>
        </div>
        <div className="side-content">
          <div className="profile">
            <div className="profile-img bg-img" ></div>
            <h4>Iloma portal</h4>
          </div>

          <div className="side-menu">
            <ul>
              <li>
                <NavLink to="/dashboard" activeClassName="active">
                  <span className="las la-home"></span>
                  <small>Dashboard</small>
                </NavLink>
              </li>
              <li>
                <NavLink to="/employee" activeClassName="active">
                  <span className="las la-user-alt"></span>
                  <small>Employee</small>
                </NavLink>
              </li>
              <li>
                <NavLink to="/holiday" activeClassName="active">
                  <span className="las la-clipboard-list"></span>
                  <small>Holiday</small>
                </NavLink>
              </li>
              <li>
                <NavLink to="/leaves" activeClassName="active">
                  <span className="las la-redo"></span>
                  <small>Leaves</small>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" activeClassName="active">
                  <span className="las la-tasks"></span>
                  <small>About</small>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="main-content">
        <header>
          <div className="header-content">
            <label htmlFor="menu-toggle">
              <span className="las la-bars"></span>
            </label>

            <div className="header-menu">
              <label htmlFor="">
                <span className="las la-search"></span>
              </label>

              <div className="notify-icon">
                <span className="las la-envelope"></span>
                <span className="notify">4</span>
              </div>

              <div className="notify-icon">
                <span className="las la-bell"></span>
                <span className="notify">3</span>
              </div>

              <div className="user">
                <div className="bg-img" style={{backgroundImage: "url(img/1.jpeg)"}}></div>
                <span className="las la-power-off" onClick={handleLogout}></span>
                <span className='logout' onClick={handleLogout}>Logout</span>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default AdminDashboard;
