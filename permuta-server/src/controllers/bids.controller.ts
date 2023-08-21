import { Request, Response } from "express";
import { getBidsParamsSchema } from "../schema/bids.schema";
import { ZodError } from "zod";
import {
  getLatestAuctionBid,
  getUserHighestBid,
} from "../services/bids.service";

export const getLatestBid = async (req: Request, res: Response) => {
  const params = req.params;
  try {
    const { id } = await getBidsParamsSchema.parseAsync(params);

    const latestBid = await getLatestAuctionBid(id);

    return res.status(200).json(latestBid);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};

export const getUserLatestBid = async (req: Request, res: Response) => {
  const params = req.params;
  try {
    const { id } = await getBidsParamsSchema.parseAsync(params);

    const userHighestBid = await getUserHighestBid(id, req.user.id);

    return res.status(200).json(userHighestBid);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};
