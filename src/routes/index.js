import { router as endpointRoutes } from './endpoints.js';
import { router as monitoringRoutes } from './monitoring.js';

export function setupRoutes(app) {
  app.use('/api/endpoints', endpointRoutes);
  app.use('/api/monitoring', monitoringRoutes);
}