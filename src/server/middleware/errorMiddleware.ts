import { type NextFunction } from "connect";
import { type Request, type Response } from "express";
import debugCreator from "debug";
import chalk from "chalk";
import CustomError from "../../CustomError/CustomError.js";

const debug = debugCreator("app:server:middleware:errorMiddleware");

export const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  const error = new CustomError("Endpoint not found", 404);
  next(error);
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
