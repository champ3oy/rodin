import express from "express";
import { endpointController } from "../controllers/endpoint.controller.js";
import { validateEndpoint } from "../middleware/validators.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/endpoints:
 *   post:
 *     summary: Create a new endpoint
 *     tags: [Endpoints]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               name:
 *                 type: string
 *               interval:
 *                 type: number
 *                 default: 60
 *                 minimum: 30
 *                 maximum: 3600
 *               active:
 *                 type: boolean
 *                 default: true
 *             required:
 *               - url
 *               - name
 *     responses:
 *       201:
 *         description: Endpoint created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", validateEndpoint, protect, endpointController.createEndpoint);

/**
 * @swagger
 * /api/endpoints:
 *   get:
 *     summary: Retrieve all endpoints
 *     tags: [Endpoints]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of endpoints
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                   name:
 *                     type: string
 *                   interval:
 *                     type: number
 *                   active:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get("/", protect, endpointController.getAllEndpoints);

/**
 * @swagger
 * /api/endpoints/{id}:
 *   put:
 *     summary: Update an existing endpoint
 *     tags: [Endpoints]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the endpoint to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               name:
 *                 type: string
 *               interval:
 *                 type: number
 *                 default: 60
 *                 minimum: 30
 *                 maximum: 3600
 *               active:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       200:
 *         description: Endpoint updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Endpoint not found
 */
router.put(
  "/:id",
  validateEndpoint,
  protect,
  endpointController.updateEndpoint
);

export default router;
