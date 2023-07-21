import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  createUser,
  getUserByEmail,
  isUserExists,
} from "../services/users.service";
import { IUserCreate, IUserLogin } from "../types";
import { userCreateSchema, userLoginSchema } from "../schema/users.schema";
import { ZodError } from "zod";

type IUserPayload = {
  id: string;
  email: string;
};

const TOKEN_EXPIRED = 60 * 24 * 3; // 3 days

const ATokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const RTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

function _generateToken(data: IUserPayload) {
  return jwt.sign(data, ATokenSecret, { expiresIn: `${TOKEN_EXPIRED}h` });
}

export const postAuthLogin = async (
  req: Request<Record<string, never>, Record<string, never>, IUserLogin>,
  res: Response,
) => {
  const body = req.body;

  try {
    const user = await userLoginSchema.parseAsync(body);

    const db_user = await getUserByEmail(user.email);
    if (!db_user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (await bcrypt.compare(user.password, db_user.password)) {
      const tokenPayload = { id: db_user.id, email: db_user.email };

      const accessToken = _generateToken(tokenPayload);
      const refreshToken = jwt.sign(tokenPayload, RTokenSecret);

      const now = new Date();
      now.setMinutes(now.getMinutes() + TOKEN_EXPIRED);

      const token = {
        expiresIn: now.toISOString(),
        accessToken,
        refreshToken,
      };

      return res.status(200).send(token);
    } else {
      return res.status(401).send({ error: "Wrong password" });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send({ error });
    }
    return res.status(500).send({ error });
  }
};

export const PostAuthSignUp = async (
  req: Request<Record<string, never>, Record<string, never>, IUserCreate>,
  res: Response,
) => {
  const body = req.body;

  try {
    const user = await userCreateSchema.parseAsync(body);

    if (await isUserExists({ email: user.email })) {
      return res.status(409).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const modifiedUser = {
      ...user,
      password: hashedPassword,
    };

    const db_user = await createUser(modifiedUser);

    const tokenPayload = { id: db_user.id, email: db_user.email };

    const accessToken = _generateToken(tokenPayload);
    const refreshToken = jwt.sign(tokenPayload, RTokenSecret);

    const now = new Date();
    now.setMinutes(now.getMinutes() + TOKEN_EXPIRED);

    const token = {
      expiresIn: now.toISOString(),
      accessToken,
      refreshToken,
    };

    return res.status(201).send(token);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send({ error });
    }
    return res.status(500).send({ error });
  }
};

export const PostAuthRefresh = async (req: Request, res: Response) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(401).send({ error: "Token not found" });
  }

  try {
    const tokenPayload = jwt.verify(refreshToken, RTokenSecret);
    const accessToken = _generateToken(tokenPayload as IUserPayload);

    const now = new Date();
    now.setMinutes(now.getMinutes() + TOKEN_EXPIRED);

    return res.status(200).send({ accessToken, expiresIn: now.toISOString() });
  } catch (error) {
    return res.status(403).send({ error });
  }
};
