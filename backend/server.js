const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'qwerty123',
    database: 'expense_tracker',
    port: 3306
});

db.query('SELECT 1', (err) => {
    if (err) console.error('Помилка підключення до MySQL:', err);
    else console.log('Підключено до MySQL!');
});

app.post('/register', (req, res) => {
    const { name, surname, email, password } = req.body;

    const checkSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkSql, [email], (err, result) => {
        if (err) return res.status(500).json({ error: "Помилка сервера" });
        if (result.length > 0) return res.status(400).json({ error: "Користувач вже існує" });

        const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?)';
        const values = [name, surname, email, password];

        db.query(sql, [values], (error, result) => {
            if (error) return res.status(500).json({ error: 'Помилка сервера' });
            return res.json({ message: 'Користувача додано успішно', userId: result.insertId });
        });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json({ error: "Помилка сервера" });
        if (result.length === 0) return res.status(401).json({ error: "Невірний email або пароль" });

        const user = {
            id: result[0].id,
            firstName: result[0].first_name,
            lastName: result[0].last_name,
            email: result[0].email,
        };
        res.json({ message: "Вхід успішний", user });
    });
});

app.post("/expenses", (req, res) => {
    const { userId, expense, price, category } = req.body;

    if (!userId || !expense || !price) {
        return res.status(400).json({ error: "Необхідні поля відсутні" });
    }

    const sql = "INSERT INTO expenses (user_id, expense, price, category) VALUES (?)";
    const values = [userId, expense, price, category || "Інше"];

    db.query(sql, [values], (err, result) => {
        if (err) return res.status(500).json({ error: "Помилка сервера" });
        res.json({ message: "Витрату додано", expenseId: result.insertId });
    });
});

app.get("/expenses/:userId", (req, res) => {
    const { userId } = req.params;

    const sql = "SELECT * FROM expenses WHERE user_id = ? ORDER BY id DESC";
    db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: "Помилка сервера" });
        res.json(result);
    });
});

app.delete("/expenses/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM expenses WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Помилка сервера" });
    res.json({ message: "Витрату видалено" });
  });
});

app.listen(8081, () => {
    console.log('Сервер запущено на порту 8081');
});

