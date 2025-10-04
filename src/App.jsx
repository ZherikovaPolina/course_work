
import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [expense, setExpense] = useState("");
  const [price, setPrice] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense && price) {
      setList([...list, { expense, price }]);
      setExpense("");
      setPrice("");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <nav>
          <ul>
            <li>Головна сторінка</li>
            <li>Аналіз</li>
            <li>Список витрат</li>
          </ul>
        </nav>
      </header>

      <h1>Трекер витрат</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Витрата"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
        <input
          type="number"
          placeholder="Ціна"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Додати витрату</button>
      </form>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item.expense}: {item.price} грн
          </li>
        ))}
      </ul>
    </div>
  );
}
