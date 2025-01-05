import express from "express";
import { monitoringController } from "../controllers/monitoring.controller.js";
const router = express.Router();
/**
 * @swagger
 * /api/monitoring/results/{endpointId}:
 *   get:
 *     summary: Retrieve monitoring results for a specific endpoint
 *     tags: [Monitoring]
 *     parameters:
 *       - in: path
 *         name: endpointId
 *         required: true
 *         description: The ID of the endpoint for which to retrieve results
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved monitoring results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                       status:
 *                         type: string
 *                       responseTime:
 *                         type: number
 *                         description: Response time in milliseconds
 *       404:
 *         description: Endpoint not found
 *       500:
 *         description: Internal server error
 */
router.get("/results/:endpointId", monitoringController.getResults);
export default router;
