import express from 'express';
import db from '../database/init.js';
import logger from '../utils/logger.js';

export const router = express.Router();

// Get monitoring results for an endpoint
router.get('/results/:endpointId', (req, res) => {
  const { endpointId } = req.params;
  
  db.all(
    'SELECT * FROM monitoring_results WHERE endpoint_id = ? ORDER BY timestamp DESC LIMIT 100',
    [endpointId],
    (err, rows) => {
      if (err) {
        logger.error('Error fetching monitoring results:', err);
        return res.status(500).json({ error: 'Failed to fetch monitoring results' });
      }
      res.json(rows);
    }
  );
});