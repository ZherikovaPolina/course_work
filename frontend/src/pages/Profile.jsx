import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile({ user }) {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:8081/api/user_rewards/${user.id}`)
      .then(res => res.json())
      .then(data => setRewards(data))
      .catch(err => console.error(err));
  }, [user]);

  if (!user) return <p>Завантаження...</p>;

  return (
    <div className="profile-page">
      <h1>Профіль користувача</h1>
      <div className="user-info">
        <p><strong>Ім’я:</strong> {user.firstName}</p>
        <p><strong>Прізвище:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="rewards-section">
        <h3>🏅 Ваші нагороди</h3>
        <div className="rewards-grid">
          {rewards.length > 0 ? (
            rewards.map(r => (
              <div className="reward-card" key={r.id}>
                <span className="reward-icon">🏆</span>
                <div>
                  <h4>{r.name}</h4>
                  <p>{r.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-rewards">Поки що немає нагород</p>
          )}
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => navigate("/expense")}>Мої витрати</button>
        <button onClick={() => navigate("/all-expenses")}>Повний список витрат</button>
      </div>
    </div>
  );
}
