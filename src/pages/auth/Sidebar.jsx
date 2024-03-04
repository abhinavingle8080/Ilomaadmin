import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom'; 

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
    <body> <img className='imge' src={require('./ilomaimg.jpg')} alt="" /> 
    <div className="sidebar">
      <div className="all">
        <div className="logo_content">
          <div className="logo">
            <header>
              <img src={require('./ilomaLogo.webp')} alt="" />
             
            </header>
          </div>
          <i className="bx bx-menu" id="btn" onClick={handleToggleSidebar}></i>
        </div>

        <ul className="nav_list">
          
        <li><Link to ="/dashboard" ><i className="bx bx-grid-alt"></i><span className="links_name">Dashboard</span></Link></li>
          <li><Link to ="/employee"><i className="bx bx-user"></i><span className="links_name">Employees</span></Link></li>
          <li><Link to ="/holidays"><i className="bx bx-pie-chart-alt-2"></i><span className="links_name">Holidays</span></Link></li>
          <li><a href="#"><i className="bx bx-chat"></i><span className="links_name">Leaves</span></a></li>
          <li><a href="#"><i className="bx bx-cart-alt"></i><span className="links_name">About US</span></a></li>
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
          <i className="bx bx-log-out"  id="log_out"></i>
        </div>
      </div>
    </div>
    </body>
  );
};

export default Sidebar;
