import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";

type LogLevel = "INFO" | "WARN" | "ERROR";

const ansi = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  gray: "\x1b[90m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

const colorForLevel = (level: LogLevel) => {
  if (level === "ERROR") return ansi.red;
  if (level === "WARN") return ansi.yellow;
  return ansi.green;
};

const colorForStatusCode = (statusCode: number) => {
  if (statusCode >= 500) return ansi.red;
  if (statusCode >= 400) return ansi.yellow;
  return ansi.green;
};

const resolveLevel = (statusCode: number): LogLevel => {
  if (statusCode >= 500) return "ERROR";
  if (statusCode >= 400) return "WARN";
  return "INFO";
};

const shortRequestId = (requestId: string) => requestId.slice(0, 8);

const getClientIp = (req: Request) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  const rawIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : (forwardedFor || req.socket.remoteAddress || "unknown").toString();

  return rawIp.replace(/^::ffff:/, "");
};

const logLine = (
  level: LogLevel,
  requestId: string,
  method: string,
  url: string,
  statusCode: number | "ABORT",
  durationMs: number,
  ip: string,
) => {
  const time = new Date().toISOString().slice(11, 23);
  const levelColor = colorForLevel(level);
  const statusText =
    statusCode === "ABORT" ? "ABORT" : statusCode.toString().padEnd(3, " ");
  const statusColor =
    statusCode === "ABORT" ? ansi.yellow : colorForStatusCode(statusCode);

  console.log(
    `${ansi.dim}${time}${ansi.reset} ${levelColor}${level.padEnd(5, " ")}${ansi.reset} ` +
      `${statusColor}${statusText}${ansi.reset} ${ansi.cyan}${method.padEnd(6, " ")}${ansi.reset} ` +
      `${url} ${ansi.gray}${durationMs.toFixed(2)}ms rid=${shortRequestId(requestId)} ip=${ip}${ansi.reset}`,
  );
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId = (req.headers["x-request-id"] as string) || randomUUID();
  const start = process.hrtime.bigint();
  const clientIp = getClientIp(req);

  req.headers["x-request-id"] = requestId;
  res.setHeader("x-request-id", requestId);

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
    const statusCode = res.statusCode;
    const level = resolveLevel(statusCode);

    logLine(
      level,
      requestId,
      req.method,
      req.originalUrl,
      statusCode,
      durationMs,
      clientIp,
    );
  });

  res.on("close", () => {
    if (res.writableEnded) {
      return;
    }

    const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;

    logLine(
      "WARN",
      requestId,
      req.method,
      req.originalUrl,
      "ABORT",
      durationMs,
      clientIp,
    );
  });

  next();
};
