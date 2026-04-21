const z = require("zod");
require("dotenv").config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  MONGO_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_ACCESS_EXPIRY: z.string().default("15m"),
  JWT_REFRESH_EXPIRY: z.string().default("7d"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const config = envSchema.parse(process.env);

module.exports = config;

// mongodb+srv://sharmaakshay209_db_user:qI7TiLBXsWGJIk0V@finance-tracker.owxeoxn.mongodb.net/
