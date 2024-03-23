import React from 'react';
import { useNavigate} from 'react-router-dom';

const LogoutButton = () => {
  const Navigate= useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    // Perform logout logic here
    // For example, clearing user session or token
    // Redirect user to the login page
    Navigate('/');
  };

  return (
    <i  className="bx bx-log-out logout-button" id="log_out" onClick={handleLogout}></i>
  );
};

export default LogoutButton;
