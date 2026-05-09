import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./analysis.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS analysis_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    input_type TEXT,
    input_text TEXT,
    extracted_text TEXT,
    language TEXT,
    prediction TEXT,
    confidence INTEGER,
    risk_level TEXT,
    created_at TEXT
  )`);
});

export default db;
