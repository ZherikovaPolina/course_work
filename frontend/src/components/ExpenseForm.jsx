import React, { useState } from "react";
import "./ExpenseForm.css";

export default function ExpenseForm({ userId, onAdd }) {
  const [expense, setExpense] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Інше");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!expense || !price) {
      setError("Будь ласка, заповніть усі поля!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8081/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, expense, price, category }),
      });
      const data = await res.json();

      if (res.ok) {
        onAdd({ id: data.expenseId, expense, price: Number(price), category });
        setExpense("");
        setPrice("");
        setCategory("Інше");
        setError("");
      } else {
        setError(data.error || "Помилка додавання витрати");
      }
    } catch (err) {
      console.error(err);
      setError("Помилка сервера");
    }
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
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
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

