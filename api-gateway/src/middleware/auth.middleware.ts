import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization?.trim();
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({
      status: "error",
      message: "JWT_SECRET is not configured",
    });
  }

  if (!authHeader) {
    return res.status(401).json({
      status: "error",
      message: "No token provided",
    });
  }

  const token = authHeader.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : authHeader;

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Authorization token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    (req as any).user = decoded;
    next();
  } catch {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};
