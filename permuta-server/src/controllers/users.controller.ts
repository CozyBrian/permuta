import { Request, Response } from "express";
import { IUserDetailsQuery, IUserParams, IUserQuery } from "../types";
import {
  getUserDetailsQuerySchema,
  getUsersParamsSchema,
  getUsersQuerySchema,
} from "../schema/users.schema";
import {
  getManyUsers,
  getUserById,
  isUserExists,
} from "../services/users.service";
import { ZodError } from "zod";

export const getUsers = async (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    IUserQuery
  >,
  res: Response,
) => {
  const query = req.query;

  try {
    const { limit, page, search, hostel_id } =
      await getUsersQuerySchema.parseAsync(query);

    const users = await getManyUsers(
      {
        limit,
        page,
      },
      {
        username: search,
        hostel_id,
      },
    );
    return res.status(200).json({
      users,
      limit,
      page,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};

export const getUserDetails = async (
  req: Request<
    IUserParams,
    Record<string, never>,
    Record<string, never>,
    IUserDetailsQuery
  >,
  res: Response,
) => {
  const params = req.params;
  const query = req.query;
  try {
    const { id } = await getUsersParamsSchema.parseAsync(params);

    if (!(await isUserExists({ id }))) {
      return res.status(404).send({ message: "User not found" });
    }

    const { items, hostel } = await getUserDetailsQuerySchema.parseAsync(query);

    const user = await getUserById(id, {
      items,
      hostel,
    });

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};
