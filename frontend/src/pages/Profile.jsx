import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile({ user }) {
  const navigate = useNavigate();

  if (!user) return <p>Завантаження...</p>;

  return (
    <div className="profile-page">
      <h1>Профіль користувача</h1>
      <p><strong>Ім’я:</strong> {user.firstName}</p>
      <p><strong>Прізвище:</strong> {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={() => navigate("/expense")}>Мої витрати</button>
      <button onClick={() => navigate("/all-expenses")}>Повний список витрат</button>
    </div>
  );
}

