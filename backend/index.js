import express from "express";
import cors from "cors";
import pool from "./db.js";
import env from "dotenv";

env.config();

const app = express();
const port=5000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title required" });

    const result = await pool.query(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
      [title]
    );

    res.json(result.rows[0]); // returns the inserted task
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const result = await pool.query(
      "UPDATE tasks SET title=$1 WHERE id=$2 RETURNING *",
      [title, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM tasks WHERE id = $1",
      [id]
    );

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen( port ,() => {
  console.log(`Server started on port ${port}`);
});
