import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { monitoringService } from '../services/monitoring.service.js';
import { uptimeService } from '../services/uptime.service.js';

export const monitoringController = {
  getResults: asyncHandler(async (req: Request, res: Response) => {
    const results = await monitoringService.getResultsByEndpoint(req.params.endpointId);
    const uptimeStats = await uptimeService.getUptimeStats(req.params.endpointId);
    
    res.json({
      results,
      uptime: uptimeStats
    });
  })
};