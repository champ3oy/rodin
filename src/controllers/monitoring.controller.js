import asyncHandler from 'express-async-handler';
import { monitoringService } from '../services/monitoring.service.js';

export const monitoringController = {
  getResults: asyncHandler(async (req, res) => {
    const results = await monitoringService.getResultsByEndpoint(req.params.endpointId);
    res.json(results);
  })
};