import sqlite3 from 'sqlite3';
import logger from '../utils/logger.js';

const db = new sqlite3.Database(':memory:');

export async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Endpoint Registry table
      db.run(`
        CREATE TABLE IF NOT EXISTS endpoints (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          url TEXT NOT NULL,
          name TEXT NOT NULL,
          interval INTEGER DEFAULT 60,
          active BOOLEAN DEFAULT true,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Monitoring Results table
      db.run(`
        CREATE TABLE IF NOT EXISTS monitoring_results (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          endpoint_id INTEGER,
          status_code INTEGER,
          response_time INTEGER,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (endpoint_id) REFERENCES endpoints (id)
        )
      `);
    });

    logger.info('Database initialized successfully');
    resolve(db);
  });
}

export default db;