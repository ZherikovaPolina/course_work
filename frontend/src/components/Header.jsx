import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);     
    setTimeout(() => navigate("/"), 0);     
  };

  return (
    <header className="header">
      <nav>
        <ul>
          <li onClick={() => navigate("/expense")}>Мої витрати</li>
          <li onClick={() => navigate("/all-expenses")}>Повний список</li>
          <li onClick={() => navigate("/profile")}>Профіль</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Вийти</button>
      </nav>
    </header>
  );
}
