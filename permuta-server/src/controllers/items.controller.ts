import { Request, Response } from "express";
import {
  IItemCreate,
  IItemParams,
  IItemQuery,
  IItemUpdate,
  IauctionFilter,
} from "../types";
import {
  getItemsParamsSchema,
  getItemsQuerySchema,
  itemsCreateSchema,
  itemsUpdateSchema,
} from "../schema/items.schema";
import {
  createItem,
  deleteItem,
  getManyItems,
  getOneItem,
  getTotalItemCount,
  isItemExists,
  updateItem,
} from "../services/items.services";
import { ZodError } from "zod";
import { UploadToCloudinary } from "../services/cloudinary/upload";

export const getAllItems = async (
  req: Request<
    IItemParams,
    Record<string, never>,
    Record<string, never>,
    IItemQuery
  >,
  res: Response,
) => {
  const query = req.query;

  try {
    const {
      limit,
      page,
      user_id,
      auctions,
      category_id,
      condition,
      search,
      auctionOpen,
    } = await getItemsQuerySchema.parseAsync(query);

    const auctionFilter = (): IauctionFilter => {
      if (auctions) {
        const parsedAuctions: boolean | undefined = JSON.parse(`${auctions}`);
        if (parsedAuctions) {
          if (auctionOpen) {
            const parsedAuctionOpen: boolean | undefined = JSON.parse(
              `${auctionOpen}`,
            );
            if (parsedAuctionOpen) {
              return {
                end_time: {
                  gt: new Date(),
                },
              };
            }
          }
          return {
            isNot: null,
          };
        } else {
          return {
            is: null,
          };
        }
      } else {
        if (auctionOpen) {
          const parsedAuctionOpen: boolean | undefined = JSON.parse(
            `${auctionOpen}`,
          );
          if (parsedAuctionOpen) {
            return {
              end_time: {
                gt: new Date(),
              },
            };
          }
        }
        return undefined;
      }
    };

    const items = await getManyItems(
      {
        limit,
        page,
      },
      {
        seller_id: user_id,
        category_id,
        condition,
        auctions: auctionFilter(),
        name: { contains: search, mode: "insensitive" },
      },
    );

    const total = await getTotalItemCount();
    const totalPages = Math.ceil(total / limit);

    const nextPage = page + 1 > totalPages ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    const Res = {
      items,
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
    console.log(error);
    return res.status(500).send({ error });
  }
};

export const getItemDetails = async (
  req: Request<
    IItemParams,
    Record<string, never>,
    Record<string, never>,
    IItemQuery
  >,
  res: Response,
) => {
  const params = req.params;

  try {
    const { id } = await getItemsParamsSchema.parseAsync(params);

    if (!(await isItemExists(id))) {
      return res.status(404).send({
        error: "Item not found",
      });
    }

    const item = await getOneItem(id);

    return res.status(200).json(item);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};

export const postItem = async (
  req: Request<Record<string, never>, Record<string, never>, IItemCreate>,
  res: Response,
) => {
  const body = req.body;

  try {
    const resultItem = await itemsCreateSchema.parseAsync({
      ...body,
      price: Number(body.price),
    });

    const image_url = await UploadToCloudinary({
      filepath: req.file?.path,
      folder: "items",
    });

    const newItem = {
      ...resultItem,
      image_url,
      seller_id: req.user?.id!,
    };

    const item = await createItem(newItem);

    return res.status(201).json(item);
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};

export const patchItem = async (
  req: Request<IItemParams, Record<string, never>, IItemUpdate>,
  res: Response,
) => {
  const params = req.params;
  const body = req.body;

  try {
    const { id } = await getItemsParamsSchema.parseAsync(params);

    if (!(await isItemExists(id))) {
      return res.status(404).send({
        error: "Item not found",
      });
    }

    const updatedItem = await itemsUpdateSchema.parseAsync(body);

    const item = await updateItem(updatedItem);

    return res.status(200).json(item);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};

export const deleteItemById = async (
  req: Request<IItemParams>,
  res: Response,
) => {
  const params = req.params;

  try {
    const { id } = await getItemsParamsSchema.parseAsync(params);

    if (!(await isItemExists(id))) {
      return res.status(404).send({
        error: "Item not found",
      });
    }

    const deletedItem = await deleteItem(id);

    return res.status(204).send(deletedItem);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send(error);
    }
    return res.status(500).send({ error });
  }
};
