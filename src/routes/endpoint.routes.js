import express from "express";
import { endpointController } from "../controllers/endpoint.controller.js";
import { validateEndpoint } from "../middleware/validators.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", validateEndpoint, protect, endpointController.createEndpoint);
router.get("/", protect, endpointController.getAllEndpoints);
router.put(
  "/:id",
  validateEndpoint,
  protect,
  endpointController.updateEndpoint
);

export default router;
