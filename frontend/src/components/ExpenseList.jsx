import React from "react";
import "./ExpenseList.css";

export default function ExpenseList({ list, onDelete }) {
  if (!list || list.length === 0)
    return <p className="empty">Поки що немає витрат </p>;

  const categoryEmoji = {
    "Їжа": "🍔",
    "Транспорт": "🚌",
    "Розваги": "🎮",
    "Одяг": "👕",
    "Інше": "🧾"
  };

  return (
    <ul className="expense-list">
      {list.map((item) => (
        <li key={item.id} className="expense-item">
          <div>
            <strong>{item.expense}</strong> <br />
            <span className="category">
              {categoryEmoji[item.category] || "🧾"} {item.category}
            </span>
          </div>
          <div className="right">
            <span className="price">{item.price} грн</span>
            <button onClick={() => onDelete(item.id)}>✕</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
