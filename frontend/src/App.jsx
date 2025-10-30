import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ExpenseFormPage from "./pages/ExpenseFormPage";
import ExpenseListPage from "./pages/ExpenseListPage";
import Header from "./components/Header";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null); 

  return (
    <Router>
      {/* Передаємо setUser у Header для кнопки Вийти */}
      {user && <Header setUser={setUser} />}
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/expense"
            element={user ? <ExpenseFormPage user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/all-expenses"
            element={user ? <ExpenseListPage user={user} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

