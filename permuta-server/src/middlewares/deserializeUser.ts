import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IUserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  try {
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    req.user = user as IUserPayload;
    return next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export default deserializeUser;
