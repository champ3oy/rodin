import axios from "axios";
import { endpointService } from "../services/endpoint.service.js";
import { monitoringService } from "../services/monitoring.service.js";
import { alertService } from "../services/alert.service.js";
import { uptimeService } from "../services/uptime.service.js";
import logger from "../utils/logger.js";

export async function checkEndpoints() {
  const endpoints = await endpointService.getActiveEndpoints();

  for (const endpoint of endpoints) {
    try {
      const startTime = Date.now();
      const response = await axios.get(endpoint.url, { timeout: 5000 });
      const responseTime = Date.now() - startTime;

      await monitoringService.saveResult({
        endpoint: endpoint._id,
        statusCode: response.status,
        responseTime,
      });

      // Update uptime and resolve any active alerts
      await uptimeService.updateUptime(endpoint, true);
      await alertService.resolveAlert(endpoint ? endpoint._id : "");
    } catch (error) {
      logger.error(`Error monitoring endpoint ${endpoint.url}:`, error);

      const statusCode = error.response?.status || 500;
      await monitoringService.saveResult({
        endpoint: endpoint._id,
        statusCode,
        responseTime: 0,
        error: error.message,
      });

      // Process failure and update uptime
      await alertService.processFailure(endpoint, error.message);
      await uptimeService.updateUptime(endpoint, false);
    }
  }
}
