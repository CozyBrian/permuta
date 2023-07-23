import express from "express";
import { getUserDetails, getUsers } from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserDetails);

export default usersRouter;
