import { Endpoint } from "../models/endpoint.model.js";
import logger from "../utils/logger.js";

export const endpointService = {
  async createEndpoint(endpointData) {
    try {
      const endpoint = new Endpoint(endpointData);
      return await endpoint.save();
    } catch (error) {
      logger.error("Error creating endpoint:", error);
      throw error;
    }
  },

  async getAllEndpoints(id) {
    try {
      return await Endpoint.find({ user: id });
    } catch (error) {
      logger.error("Error fetching endpoints:", error);
      throw error;
    }
  },

  async getActiveEndpoints() {
    try {
      return await Endpoint.find({ active: true });
    } catch (error) {
      logger.error("Error fetching active endpoints:", error);
      throw error;
    }
  },

  async updateEndpoint(id, updateData) {
    try {
      return await Endpoint.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      logger.error("Error updating endpoint:", error);
      throw error;
    }
  },
};
