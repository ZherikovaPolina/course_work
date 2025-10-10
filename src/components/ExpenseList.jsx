import React from "react";
import "./ExpenseList.css";

export default function ExpenseList({ list, onDelete }) {
  return (
    <ul className="expense-list">
      {list.length === 0 ? (
        <p className="empty">Поки що немає витрат 🙂</p>
      ) : (
        list.map((item, index) => (
          <li key={index} className="expense-item">
            <div>
              <strong>{item.expense}</strong> <br />
              <span className="category">{item.category}</span>
            </div>
            <div className="right">
              <span className="price">{item.price} грн</span>
              <button onClick={() => onDelete(index)}>✕</button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

