import { MonitoringResult } from "../models/monitoring-result.model.js";
import logger from "../utils/logger.js";
export const monitoringService = {
    async saveResult(resultData) {
        try {
            const result = new MonitoringResult(resultData);
            return await result.save();
        }
        catch (error) {
            logger.error("Error saving monitoring result:", error);
            throw error;
        }
    },
    async getResultsByEndpoint(endpointId, limit = 100) {
        try {
            if (!endpointId) {
                return [];
            }
            return await MonitoringResult.find({ endpoint: endpointId })
                .sort({ createdAt: -1 })
                .limit(limit)
                .populate("endpoint", "name url");
        }
        catch (error) {
            logger.error("Error fetching monitoring results:", error);
            throw error;
        }
    },
};
