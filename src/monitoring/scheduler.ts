import cron from "node-cron";
import { checkEndpoints } from "./monitor.js";
import logger from "../utils/logger.js";

export function startMonitoringSystem() {
  cron.schedule("*/10 * * * *", async () => {
    setTimeout(async () => {
      try {
        await checkEndpoints();
      } catch (error) {
        logger.error("Error in monitoring schedule:", error);
      }
    }, 120000);
  });

  logger.info("Monitoring system started");
}
