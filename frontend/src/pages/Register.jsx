import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

export default function Register({ setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) return alert("Заповніть усі поля!");

    try {
      const res = await fetch("http://localhost:8081/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: firstName, surname: lastName, email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setUser({ id: data.userId, firstName, lastName, email });
        navigate("/profile");
      } else {
        alert(data.error || "Помилка при реєстрації");
      }
    } catch (err) {
      console.error(err);
      alert("Не вдалося підключитися до сервера");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Реєстрація</h2>
        <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Ім'я" />
        <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Прізвище" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
}


