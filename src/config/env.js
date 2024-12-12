import dotenv from "dotenv";

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/monitoring-system",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "24h",
};
