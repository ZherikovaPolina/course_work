import React from "react";
import "./Total.css";

export default function Total({ expenses = [] }) {
  const total = expenses.length > 0 
    ? expenses.reduce((sum, e) => sum + parseFloat(e.price || 0), 0)
    : 0;

  return (
    <div className="total">
      💰 Загальна сума витрат: <span>{total.toFixed(2)} грн</span>
    </div>
  );
}

