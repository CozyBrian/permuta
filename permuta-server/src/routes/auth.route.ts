import express from "express";
import { postAuthLogin, PostAuthSignUp } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/login", postAuthLogin);
authRouter.post("/signup", PostAuthSignUp);

export default authRouter;
