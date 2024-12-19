import asyncHandler from "express-async-handler";
import { endpointService } from "../services/endpoint.service.js";

export const endpointController = {
  createEndpoint: asyncHandler(async (req, res) => {
    let user = req.user;
    if (!user) {
      user = await User.findOne({ email: req.body.email });
    }

    const endpoint = await endpointService.createEndpoint({
      ...req.body,
      user: user._id,
    });
    res.status(201).json(endpoint);
  }),

  getAllEndpoints: asyncHandler(async (req, res) => {
    const user = req.user;
    const endpoints = await endpointService.getAllEndpoints(user?._id);
    res.json(endpoints);
  }),

  updateEndpoint: asyncHandler(async (req, res) => {
    const endpoint = await endpointService.updateEndpoint(
      req.params.id,
      req.body
    );
    if (!endpoint) {
      res.status(404);
      throw new Error("Endpoint not found");
    }
    res.json(endpoint);
  }),
};
