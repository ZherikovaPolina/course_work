import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>💰 Менеджер витрат</h1>
      <p>Відстежуйте свої витрати, плануйте бюджет та аналізуйте фінанси.</p>
      <div className="buttons">
        <button onClick={() => navigate("/login")}>Увійти</button>
        <button onClick={() => navigate("/register")}>Зареєструватися</button>
      </div>
    </div>
  );
}

