import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/gateway.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger";
import { verifyToken } from "./middleware/auth.middleware";
import authRoutes from "./routes/auth.routes";
import { requestLogger } from "./middleware/request-logger.middleware";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(requestLogger);
app.use(express.json());

/**
 * PUBLIC ROUTES
 */

app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth route (login)
app.use("/api/v1/auth", authRoutes);

/**
 * PROTECTED ROUTES
 */
app.use("/api/v1", verifyToken, routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
