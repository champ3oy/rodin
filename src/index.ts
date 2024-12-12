import express from "express";
import { config } from "./config/env.js";
import { connectDB } from "./config/database.js";
import { startMonitoringSystem } from "./monitoring/scheduler.js";
import endpointRoutes from "./routes/endpoint.routes.js";
import monitoringRoutes from "./routes/monitoring.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.js";
import logger from "./utils/logger.js";

const app = express();

// Connect to MongoDB
await connectDB();

app.use(express.json());

// Routes
app.use("/api/endpoints", endpointRoutes);
app.use("/api/monitoring", monitoringRoutes);
app.use("/api/auth", authRoutes);

// Error Handler
app.use(errorHandler);

// Start monitoring system
startMonitoringSystem();

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
