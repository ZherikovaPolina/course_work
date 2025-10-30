import React, { useState, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";

export default function ExpenseListPage({ user }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:8081/expenses/${user.id}`)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, [user]);

  const deleteExpense = async (id) => {
    try {
      const res = await fetch(`http://localhost:8081/expenses/${id}`, { method: "DELETE" });
      if (res.ok) setExpenses(expenses.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Повний список витрат</h2>
      <ExpenseList list={expenses} onDelete={deleteExpense} />
    </div>
  );
}
