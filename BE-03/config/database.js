import sqlite3 from "sqlite3";
import {open} from "sqlite"

const db = await open({
    filename: "./tasks.db",
    driver: sqlite3.Database
});

await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER DEFAULT 0
    )
`);

const result = await db.get(
    "SELECT COUNT(*) as count FROM tasks"
);

if(result.count === 0){

    await db.run(
        "INSERT INTO tasks(title, done) VALUES (?, ?)",
        ["Learn Express", 1]
    );

    await db.run(
        "INSERT INTO tasks(title, done) VALUES (?, ?)",
        ["Learn Rest API", 1]
    );

    await db.run(
        "INSERT INTO tasks(title, done) VALUES (?, ?)",
        ["Learn SQL", 1]
    );
}

export default db;
