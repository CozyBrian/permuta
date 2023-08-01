import express from "express";
import {
  getSignInUserDetails,
  getUserDetails,
  getUsers,
} from "../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/me", getSignInUserDetails);
usersRouter.get("/:id", getUserDetails);

export default usersRouter;
