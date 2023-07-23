import { Request, Response } from "express";
import { IHostelsParams, IHostelsQuery } from "../types";
import {
  getHostelsParamsSchema,
  getHostelsQuerySchema,
} from "../schema/hostels.schema";
import {
  getManyHostels,
  getOneHostel,
  isHostelExists,
} from "../services/hostels.services";
import { ZodError } from "zod";

export const getHostels = async (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    Record<string, never>,
    IHostelsQuery
  >,
  res: Response,
) => {
  const query = req.query;

  try {
    const { limit, page, search } = await getHostelsQuerySchema.parseAsync(
      query,
    );

    const hostels = await getManyHostels(
      {
        limit,
        page,
      },
      {
        name: { contains: search, mode: "insensitive" },
      },
    );

    return res.status(200).json({
      items: hostels,
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

export const getHostelDetails = async (
  req: Request<
    IHostelsParams,
    Record<string, never>,
    Record<string, never>,
    Record<string, never>
  >,
  res: Response,
) => {
  const params = req.params;

  try {
    const { id } = await getHostelsParamsSchema.parseAsync(params);

    if (!(await isHostelExists(id))) {
      return res.status(404).send({
        error: "Hostel not found",
      });
    }

    const hostel = await getOneHostel(id);

    return res.status(200).json(hostel);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};
