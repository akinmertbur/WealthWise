// src/components/BudgetDate/BudgetDate.jsx
import React from "react";
import "./BudgetDate.css";

const BudgetDate = ({ date, setDate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDate((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  const years = Array.from({ length: 50 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  return (
    <div className="budget-date">
      <label>
        Month:
        <select name="month" value={date.month} onChange={handleChange}>
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Year:
        <select name="year" value={date.year} onChange={handleChange}>
          <option value="">Select Year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default BudgetDate;
