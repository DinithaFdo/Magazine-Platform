import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    service: "article-service",
    timestamp: new Date().toISOString(),
  });
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err?.name === "ZodError") {
    return res.status(422).json({
      status: "error",
      code: 422,
      message: "Validation failed",
      errors: err.issues,
      service: "article-service",
      timestamp: new Date().toISOString(),
    });
  }

  const statusCode = err?.statusCode || 500;
  const message = statusCode >= 500 ? "Internal server error" : err?.message;

  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message,
    service: "article-service",
    timestamp: new Date().toISOString(),
  });
};
