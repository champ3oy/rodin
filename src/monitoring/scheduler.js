import cron from "node-cron";
import { checkEndpoints } from "./monitor.ts";
import logger from "../utils/logger.js";

export function startMonitoringSystem() {
  cron.schedule("*/10 * * * *", async () => {
    try {
      await checkEndpoints();
    } catch (error) {
      logger.error("Error in monitoring schedule:", error);
    }
  });

  logger.info("Monitoring system started");
}
