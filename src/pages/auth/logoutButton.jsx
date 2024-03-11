import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clearing user session or token
    // Redirect user to the login page
    navigate('/');
  };

  return (
    <i className="bx bx-log-out" id="log_out" onClick={handleLogout}></i>
  );
};

export default LogoutButton;
