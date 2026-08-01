import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        done BOOLEAN DEFAULT false
    )
`);

const result = await pool.query("SELECT COUNT(*) as count FROM tasks");

if (Number(result.rows[0].count) === 0) {
    await pool.query("INSERT INTO tasks(title, done) VALUES ($1, $2)", ["Learn Express", true]);
    await pool.query("INSERT INTO tasks(title, done) VALUES ($1, $2)", ["Learn Rest API", true]);
    await pool.query("INSERT INTO tasks(title, done) VALUES ($1, $2)", ["Learn SQL", true]);
}

export default pool;