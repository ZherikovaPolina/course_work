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

app.post("/expenses", async (req, res) => {
  const { userId, expense, price, category } = req.body;

  if (!userId || !expense || !price) {
    return res.status(400).json({ error: "Необхідні поля відсутні" });
  }

  try {
    const [insertResult] = await db
      .promise()
      .query("INSERT INTO expenses (user_id, expense, price, category) VALUES (?, ?, ?, ?)", [
        userId,
        expense,
        price,
        category || "Інше",
      ]);

    // Отримуємо кількість витрат
    const [expenses] = await db.promise().query("SELECT COUNT(*) AS count FROM expenses WHERE user_id = ?", [userId]);
    const count = expenses[0].count;

    let rewardMessage = null;

    if (count === 1) {
      await db.promise().query("INSERT INTO user_rewards (user_id, reward_id) VALUES (?, 1)", [userId]);
      rewardMessage = "🎉 Ви отримали нагороду: Перша витрата!";
    }

    if (count === 10) {
      await db.promise().query("INSERT INTO user_rewards (user_id, reward_id) VALUES (?, 2)", [userId]);
      rewardMessage = "🏆 Ви додали 10 витрат! Ви справжній Майстер бюджету!";
    }

    res.json({
      message: "Витрату додано!",
      expenseId: insertResult.insertId,
      rewardMessage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

app.get("/expenses/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = "SELECT * FROM expenses WHERE user_id = ? ORDER BY id DESC";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: "Помилка сервера" });
    res.json(result);
  });
});

app.delete("/expenses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [[expense]] = await db.promise().query("SELECT user_id FROM expenses WHERE id = ?", [id]);
    if (!expense) return res.status(404).json({ error: "Витрату не знайдено" });

    const userId = expense.user_id;

    await db.promise().query("DELETE FROM expenses WHERE id = ?", [id]);

    const [[{ count }]] = await db.promise().query("SELECT COUNT(*) AS count FROM expenses WHERE user_id = ?", [userId]);

    if (count < 1) {
      await db.promise().query("DELETE FROM user_rewards WHERE user_id = ? AND reward_id = 1", [userId]);
    }

    if (count < 10) {
      await db.promise().query("DELETE FROM user_rewards WHERE user_id = ? AND reward_id = 2", [userId]);
    }

    res.json({ message: "Витрату видалено" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка при видаленні витрати" });
  }
});

app.get("/api/user_rewards/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT rewards.id, rewards.name, rewards.description
         FROM user_rewards
         JOIN rewards ON rewards.id = user_rewards.reward_id
         WHERE user_rewards.user_id = ?`,
        [userId]
      );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка сервера при отриманні нагород" });
  }
});

app.listen(8081, () => {
  console.log('Сервер запущено на порту 8081');
});
