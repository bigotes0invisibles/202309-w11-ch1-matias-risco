import { type NextFunction } from "connect";
import { type Request, type Response } from "express";
import debugCreator from "debug";
import chalk from "chalk";
import type CustomError from "../../CustomError/CustomError";

const debug = debugCreator("app:server:middleware:errorMiddleware");

export const notFound = (_req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const generalError = (
  { message, statusCode, privateMessage }: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const errorDev = privateMessage ?? message;
  debug(chalk.red(errorDev));

  res.status(statusCode).json({ error: message });
};
