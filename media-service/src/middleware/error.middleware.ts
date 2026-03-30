import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    service: "media-service",
    timestamp: new Date().toISOString(),
  });
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err?.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      status: "error",
      code: 413,
      message: "Uploaded file is too large",
      service: "media-service",
      timestamp: new Date().toISOString(),
    });
  }

  if (err?.message === "Unsupported file type") {
    return res.status(415).json({
      status: "error",
      code: 415,
      message: "Unsupported media type",
      service: "media-service",
      timestamp: new Date().toISOString(),
    });
  }

  const statusCode = err?.statusCode || 500;
  const message = statusCode >= 500 ? "Internal server error" : err?.message;

  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message,
    service: "media-service",
    timestamp: new Date().toISOString(),
  });
};
