import React from "react";
import "./SummaryCard.css";

const SummaryCard = ({ savings, income, expenses }) => {
  return (
    <div className="summary-container">
      <div className="summary-card">
        <div className="summary-header">
          <label>Balance</label>
          <span className="summary-amount balance">{savings} ₺</span>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-header">
          <label>Incomes</label>
          <span className="summary-amount income">{income} ₺</span>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-header">
          <label>Expenses</label>
          <span className="summary-amount expenses">{expenses} ₺</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
