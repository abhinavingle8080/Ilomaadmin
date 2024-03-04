import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './pages/auth/Sidebar';
import Login from './pages/auth/Login';
import Employees from './pages/auth/Employees';
import Holidays from './pages/auth/Holidays';

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Sidebar />} />
        <Route path="/employee" element={<Employees />} />
        <Route path="/holidays" element={<Holidays />} />

      </Routes>
       

    </Router>
  );
}

export default App;