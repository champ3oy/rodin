import { Alert } from "../models/alert.model.js";
import { IEndpoint } from "../models/endpoint.model.js";
import { sendNotification } from "../utils/notification.js";
import logger from "../utils/logger.js";

const FAILURE_THRESHOLD = 3;

export const alertService = {
  async processFailure(endpoint: IEndpoint, error: string): Promise<void> {
    try {
      let alert = await Alert.findOne({
        endpoint: endpoint._id,
        status: "active",
      });

      if (alert) {
        alert.failureCount += 1;
        await alert.save();
      } else {
        alert = await Alert.create({
          endpoint: endpoint._id,
          user: endpoint.user,
          message: `Service ${endpoint.name} (${endpoint.url}) is down: ${error}`,
          failureCount: 1,
          firstFailureAt: new Date(),
        });
      }

      if (alert.failureCount === FAILURE_THRESHOLD) {
        await sendNotification({
          userId: endpoint.user ? endpoint.user.toString() : "",
          title: "Service Down Alert",
          message: alert.message,
          type: "service_down",
        });
      }
    } catch (error) {
      logger.error("Error processing failure alert:", error);
    }
  },

  async resolveAlert(endpointId: any): Promise<void> {
    try {
      const alert = await Alert.findOne({
        endpoint: endpointId,
        status: "active",
      });

      if (alert) {
        alert.status = "resolved";
        alert.resolvedAt = new Date();
        await alert.save();
      }
    } catch (error) {
      logger.error("Error resolving alert:", error);
    }
  },
};
