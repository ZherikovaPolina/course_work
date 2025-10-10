import React, { useState } from "react";
import "./ExpenseForm.css";

export default function ExpenseForm({ onAdd }) {
  const [expense, setExpense] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Інше");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense || !price) {
      setError("Будь ласка, заповніть усі поля!");
      return;
    }
    onAdd({ expense, price: Number(price), category });
    setExpense("");
    setPrice("");
    setCategory("Інше");
    setError("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Назва витрати"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />
      <input
        type="number"
        placeholder="Сума"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Їжа">🍔 Їжа</option>
        <option value="Транспорт">🚌 Транспорт</option>
        <option value="Розваги">🎮 Розваги</option>
        <option value="Одяг">👕 Одяг</option>
        <option value="Інше">🧾 Інше</option>
      </select>
      <button type="submit">Додати</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
