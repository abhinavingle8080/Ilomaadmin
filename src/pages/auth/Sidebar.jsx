import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const handleToggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const btn = document.querySelector("#btn");

    sidebar.classList.toggle("active");

    if (btn.classList.contains("bx-menu")) {
      btn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      btn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  return (
    <div className="sidebar">
      <div className="all">
        <div className="logo_content">
          <div className="logo">
            <header>
              <img src={require('./ilomaLogo.webp')} alt="" />
              <p>Iloma</p>
            </header>
          </div>
          <i className="bx bx-menu" id="btn" onClick={handleToggleSidebar}></i>
        </div>

        <ul className="nav_list">
          <li><NavLink to="/dashboard"><i className="bx bx-grid-alt"></i><span className="links_name">Dashboard</span></NavLink></li>
          <li><NavLink to="/employee"><i className="bx bx-user"></i><span className="links_name">Employee</span></NavLink></li>
          <li><NavLink to="/holiday"><i className="bx bx-chat"></i><span className="links_name">Holiday</span></NavLink></li>
          <li><NavLink to="/leaves"><i className="bx bx-pie-chart-alt-2"></i><span className="links_name">Leaves</span></NavLink></li>
          <li><NavLink to="/about"><i className="bx bx-folder"></i><span className="links_name">About</span></NavLink></li>
        </ul>
      </div>

      <div className="profile_content">
        <div className="profile">
          <div className="links_name">
            <div className="social-links">
              <a href="#"><i className="bx bxl-twitter"></i></a>
              <a href="#"><i className="bx bxl-facebook"></i></a>
              <a href="#"><i className="bx bxl-instagram"></i></a>
            </div>
          </div>
          <i className="bx bx-log-out" id="log_out"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
