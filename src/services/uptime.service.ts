import { Uptime } from "../models/uptime.model.js";
import { IEndpoint } from "../models/endpoint.model.js";
import logger from "../utils/logger.js";

export const uptimeService = {
  async updateUptime(endpoint: IEndpoint, isUp: boolean): Promise<void> {
    try {
      let uptime = await Uptime.findOne({ endpoint: endpoint._id });

      if (!uptime) {
        uptime = new Uptime({ endpoint: endpoint._id });
      }

      uptime.totalChecks += 1;
      if (isUp) {
        uptime.successfulChecks += 1;
        if (uptime.lastDowntimeStart) {
          const downtime = Math.floor(
            (Date.now() - uptime.lastDowntimeStart.getTime()) / 60000
          );
          uptime.totalDowntime += downtime;
          uptime.lastDowntimeStart = undefined;
        }
      } else if (!uptime.lastDowntimeStart) {
        uptime.lastDowntimeStart = new Date();
      }

      uptime.uptimePercentage =
        (uptime.successfulChecks / uptime.totalChecks) * 100;
      uptime.lastUpdated = new Date();

      await uptime.save();
    } catch (error) {
      logger.error("Error updating uptime:", error);
    }
  },

  async getUptimeStats(endpointId: string) {
    try {
      const uptime = await Uptime.findOne({ endpoint: endpointId });
      if (!uptime) return null;

      const currentDowntime = uptime.lastDowntimeStart
        ? Math.floor((Date.now() - uptime.lastDowntimeStart.getTime()) / 60000)
        : 0;

      return {
        uptimePercentage: uptime.uptimePercentage.toFixed(2),
        totalDowntime: uptime.totalDowntime + currentDowntime,
        totalChecks: uptime.totalChecks,
        lastUpdated: uptime.lastUpdated,
      };
    } catch (error) {
      logger.error("Error getting uptime stats:", error);
      throw error;
    }
  },
};
