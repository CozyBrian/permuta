import express from "express";
import {
  postAuthLogin,
  PostAuthRefresh,
  PostAuthSignUp,
} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", postAuthLogin);
authRouter.post("/signup", PostAuthSignUp);
authRouter.post("/refresh", PostAuthRefresh);
export default authRouter;
