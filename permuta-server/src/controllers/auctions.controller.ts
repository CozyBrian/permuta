import { Request, Response } from "express";
import {
  auctionsCreateSchema,
  auctionsUpdateSchema,
  getAuctionParamsSchema,
  getAuctionsQuerySchema,
} from "../schema/auctions.schema";
import {
  GetAuctionDetails,
  createAnAuction,
  deleteAnAuction,
  getAllAuctions,
  getTotalAuctionCount,
  isAuctionExists,
  updateAnAuction,
} from "../services/auctions.service";
import { ZodError } from "zod";
import { IAuctionCreate, IAuctionParams, IAuctionUpdate } from "../types";

export const getAuctions = async (req: Request, res: Response) => {
  const query = req.query;
  try {
    const { limit, page, seller_id, status } =
      await getAuctionsQuerySchema.parseAsync(query);
    const auctions = await getAllAuctions(
      { limit, page },
      {
        seller_id,
        status,
      },
    );

    const total = await getTotalAuctionCount();
    const totalPages = Math.ceil(total / limit);

    const nextPage = page + 1 > totalPages ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    const Res = {
      items: auctions,
      limit,
      page,
      total,
      totalPages,
      nextPage,
      prevPage,
    };

    return res.status(200).json(Res);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};

export const getAuction = async (req: Request, res: Response) => {
  const params = req.params;
  try {
    const { id } = await getAuctionParamsSchema.parseAsync(params);

    if (!(await isAuctionExists(id))) {
      return res.status(404).send({
        error: "Auction not found",
      });
    }

    const auction = await GetAuctionDetails(id);

    return res.status(200).json(auction);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};

export const patchAuction = async (
  req: Request<IAuctionParams, Record<string, never>, IAuctionUpdate>,
  res: Response,
) => {
  const params = req.params;
  const body = req.body;
  try {
    const { id } = await getAuctionParamsSchema.parseAsync(params);

    if (!(await isAuctionExists(id))) {
      return res.status(404).send({
        error: "Auction not found",
      });
    }

    const updatedAuction = await auctionsUpdateSchema.parseAsync(body);

    const auction = await updateAnAuction(updatedAuction);

    return res.status(200).json(auction);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};

export const postAuction = async (
  req: Request<Record<string, never>, Record<string, never>, IAuctionCreate>,
  res: Response,
) => {
  const body = req.body;
  try {
    const newAuction = await auctionsCreateSchema.parseAsync(body);

    const auction = createAnAuction(newAuction);

    return res.status(201).json(auction);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};

export const deleteAuction = async (
  req: Request<IAuctionParams>,
  res: Response,
) => {
  const params = req.params;

  try {
    const { id } = await getAuctionParamsSchema.parseAsync(params);

    if (!(await isAuctionExists(id))) {
      return res.status(404).send({
        error: "Auction not found",
      });
    }

    const deletedAuction = deleteAnAuction(id);

    return res.status(204).send(deletedAuction);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};
