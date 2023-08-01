import express from "express";
import deserializeUser from "../middlewares/deserializeUser";
import usersRouter from "./users.route";
import authRouter from "./auth.route";
import itemsRouter from "./items.route";
import HostelsRouter from "./hostels.route";
import CategoryRouter from "./category.route";
import AuctionsRouter from "./auctions.route";

const v1_api = express.Router();

v1_api.use("/auth", authRouter);
v1_api.use("/hostels", HostelsRouter);
v1_api.use("/users", deserializeUser, usersRouter);
v1_api.use("/items", deserializeUser, itemsRouter);
v1_api.use("/auctions", deserializeUser, AuctionsRouter);
v1_api.use("/categories", deserializeUser, CategoryRouter);

export default v1_api;
