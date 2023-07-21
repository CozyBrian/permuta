import express from "express";
import usersRouter from "./users.route";
import authRouter from "./auth.route";
import itemsRouter from "./items.route";
import deserializeUser from "../middlewares/deserializeUser";

const v1_api = express.Router();

v1_api.use("/auth", authRouter);
v1_api.use("/users", deserializeUser, usersRouter);
v1_api.use("/items", deserializeUser, itemsRouter);

export default v1_api;
