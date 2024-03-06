import React, { useState, useEffect } from "react";
import "./Holidays.css";
import axios from "axios";


const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post('http://localhost:8020/api/superadmin/get-all-holidays',{
          // Your POST data goes here
          page: 1,
          limit: 10
          }, {
          headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
          }
          });
        setHolidays(response?.data?.rows);
      } catch (error) {
        setError("Error fetching holidays: " + error.message);
      }
    };

    fetchHolidays();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <section>
      <div className="head">
        <h3>Holidays</h3>
        <h5>Holidays List</h5>
        <div>
          <button className="createCategory"> + Create Holiday</button>
        </div>
      </div>
      <div className="table-data">
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {holidays?.map((holiday, index) => (
              <tr key={holiday?.id}>
                <td>{index + 1}</td>
                <td>{holiday.name}</td>
                <td>{holiday.date}</td>
                <td>{holiday.description}</td>
                <td>
                  <span className="view-icon">
                    <i className="fas fa-eye"></i>
                  </span>
                  <span className="edit-icon">
                    <i className="fas fa-pen"></i>
                  </span>
                  <span className="delete-icon">
                    <i className="fas fa-trash"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Holidays;
