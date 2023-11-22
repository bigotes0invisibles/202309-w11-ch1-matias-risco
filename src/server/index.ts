import morgan from "morgan";
import express from "express";
import cors from "cors";

import app from "./app.js";
import pingRouter from "../features/ping/router/pingRouter.js";
import mechasRouter from "../features/mechas/router/mechasRouter.js";
import { corsOptions } from "./utils/cords.js";
import { userRouter } from "../features/users/router/userRouter.js";
import { generalError, notFound } from "./middleware/errorMiddleware.js";

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use("/mechas", mechasRouter);
app.use("/user", userRouter);
app.get("/", pingRouter);
app.use(notFound);
app.use(generalError);
