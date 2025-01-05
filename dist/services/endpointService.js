import db from '../database/init.js';
import logger from '../utils/logger.js';
export function getActiveEndpoints() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM endpoints WHERE active = 1', (err, rows) => {
            if (err) {
                logger.error('Error fetching active endpoints:', err);
                reject(err);
            }
            resolve(rows);
        });
    });
}
export function saveMonitoringResult({ endpointId, statusCode, responseTime }) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO monitoring_results (endpoint_id, status_code, response_time) VALUES (?, ?, ?)', [endpointId, statusCode, responseTime], function (err) {
            if (err) {
                logger.error('Error saving monitoring result:', err);
                reject(err);
            }
            resolve(this.lastID);
        });
    });
}
