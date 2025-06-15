// db.js
import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL connection settings
const pool = new Pool({
  user: "postgres",
  host: "db", // the ip of Postgres
  database: "crypto_db",
  password: "student",
  port: 5432
});

// Test the connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err)); 

export default pool;
