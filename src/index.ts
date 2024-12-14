import express from "express";
import { config } from "./config/env.js";
import { connectDB } from "./config/database.js";
import { startMonitoringSystem } from "./monitoring/scheduler.js";
import endpointRoutes from "./routes/endpoint.routes.js";
import monitoringRoutes from "./routes/monitoring.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.js";
import logger from "./utils/logger.js";
import { swaggerUi } from "./utils/swagger.js";
import { swaggerDocs } from "./utils/swagger.js";
import cors from "cors"

const app = express();

// Connect to MongoDB
await connectDB();

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
};


app.use(express.json());
app.use(cors(corsOptions));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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