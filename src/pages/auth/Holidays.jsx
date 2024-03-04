import React from 'react';
import './Holidays.css';

const holidays = [
  { date: '1 Jan', name: "New Year's Day" },
  { date: '26 Jan', name: "Republic Day" },
  { date: '25 Mar', name: "Holi Duliwandan" },
  { date: '14 Apr', name: "Ambedkar Jayanti" },
  { date: '15 Aug', name: "Independence Day" },
  { date: '2 Oct', name: "Gandhi Jayanti" },
  { date: '12 Oct', name: "Dussehra" },
  { date: 'Diwali Holiday', name: "Diwali Holiday", description: "2-3 days as per date for the year will be conveyed in advance based on date for this year" },
  { date: '25 Dec', name: "Christmas" }
];

const HolidayList = () => {
  return (
    <div className="holiday-list-container">
      <h2 className="holiday-list-title">iLoma Holidays Calendar</h2>
      <table className="holiday-list-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((holiday, index) => (
            <tr key={index}>
              <td>{holiday.date}</td>
              <td>{holiday.name}</td>
              <td>{holiday.description || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HolidayList;
