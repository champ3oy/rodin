import express from 'express';
import { validateEndpoint } from '../validators/endpointValidator.js';
import db from '../database/init.js';
import logger from '../utils/logger.js';

export const router = express.Router();

// Add new endpoint
router.post('/', validateEndpoint, (req, res) => {
  const { url, name, interval } = req.body;
  
  db.run(
    'INSERT INTO endpoints (url, name, interval) VALUES (?, ?, ?)',
    [url, name, interval],
    function(err) {
      if (err) {
        logger.error('Error adding endpoint:', err);
        return res.status(500).json({ error: 'Failed to add endpoint' });
      }
      res.status(201).json({ id: this.lastID, url, name, interval });
    }
  );
});

// Get all endpoints
router.get('/', (req, res) => {
  db.all('SELECT * FROM endpoints', (err, rows) => {
    if (err) {
      logger.error('Error fetching endpoints:', err);
      return res.status(500).json({ error: 'Failed to fetch endpoints' });
    }
    res.json(rows);
  });
});