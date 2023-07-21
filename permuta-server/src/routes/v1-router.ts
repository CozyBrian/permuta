import express from "express";
import usersRouter from "./users.route";
// import sitesRouter from "./sites/sites.route";
// import eventsRouter from "./events/events.route";
import authRouter from "./auth.route";
// import WhichUser from "../middlewares/jwt";

const v1_api = express.Router();

v1_api.use("/auth", authRouter);
v1_api.use("/users", usersRouter);
// v1_api.use('/sites', WhichUser, sitesRouter);
// v1_api.use('/events', eventsRouter);

export default v1_api;
