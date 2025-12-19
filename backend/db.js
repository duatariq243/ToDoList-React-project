import pkg from "pg";
import env from "dotenv";

env.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
  
});
console.log({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  db: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
});

export default pool;
