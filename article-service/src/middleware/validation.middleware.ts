import { NextFunction, Request, Response } from "express";
import { ZodError, ZodTypeAny } from "zod";

const handleZodError = (res: Response, err: ZodError) => {
  return res.status(422).json({
    status: "error",
    code: 422,
    message: "Validation failed",
    errors: err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
    service: "article-service",
    timestamp: new Date().toISOString(),
  });
};

export const validateBody = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return handleZodError(res, err);
      }
      next(err);
    }
  };
};

export const validateQuery = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return handleZodError(res, err);
      }
      next(err);
    }
  };
};

export const validateParams = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return handleZodError(res, err);
      }
      next(err);
    }
  };
};
