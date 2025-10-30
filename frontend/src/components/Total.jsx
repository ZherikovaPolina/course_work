import React from "react";
import "./Total.css";

export default function Total({ list }) {
  const total = list.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="total">
      <h3>💰 Загальна сума: {total} грн</h3>
    </div>
  );
}

