import express from 'express';
import { monitoringController } from '../controllers/monitoring.controller.js';

const router = express.Router();

router.get('/results/:endpointId', monitoringController.getResults);

export default router;