import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    service: "subscription-service",
    timestamp: new Date().toISOString(),
  });
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err?.statusCode || 500;
  const message = statusCode >= 500 ? "Internal server error" : err?.message;

  res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message,
    service: "subscription-service",
    timestamp: new Date().toISOString(),
  });
};
