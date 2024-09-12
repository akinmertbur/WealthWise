import React from "react";
import "./SummaryCard.css";
import { FaArrowDown, FaArrowUp, FaPiggyBank } from "react-icons/fa";

const SummaryCard = ({ income, expenses, savings }) => {
  return (
    <div className="summary-card">
      <h2>Financial Summary</h2>
      <div className="summary-field">
        <FaArrowUp className="icon income-icon" />
        <div className="summary-details">
          <label>Income</label>
          <span className="amount income-amount">{income} ₺</span>
        </div>
      </div>
      <div className="summary-field">
        <FaArrowDown className="icon expenses-icon" />
        <div className="summary-details">
          <label>Expenses</label>
          <span className="amount expenses-amount">{expenses} ₺</span>
        </div>
      </div>
      <div className="summary-field">
        <FaPiggyBank className="icon savings-icon" />
        <div className="summary-details">
          <label>Savings</label>
          <span className="amount savings-amount">{savings} ₺</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
