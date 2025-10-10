
import React, { useState } from "react";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Total from "./components/Total";
import "./App.css";

export default function App() {
  const [list, setList] = useState([]);

  const addExpense = (item) => {
    setList([...list, item]);
  };

  const deleteExpense = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <Header />
      <main>
        <h1>Трекер витрат</h1>
        <ExpenseForm onAdd={addExpense} />
        <ExpenseList list={list} onDelete={deleteExpense} />
        <Total list={list} />
      </main>
    </div>
  );
}
