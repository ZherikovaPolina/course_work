import React, { useState, useEffect } from "react";
import ExpenseList from "../components/ExpenseList";
import Total from "../components/Total";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      const res = await fetch(`http://localhost:8081/expenses/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setExpenses(expenses.filter((e) => e.id !== id));
        toast.warn("🗑️ Витрату видалено!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Помилка при видаленні витрати", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="list-page">
      <h2>Повний список витрат</h2>
      <ExpenseList list={expenses} onDelete={deleteExpense} />
      <Total expenses={expenses} />
    </div>
  );
}
