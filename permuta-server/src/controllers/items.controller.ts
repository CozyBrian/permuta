import { Request, Response } from "express";
import { IItemCreate, IItemParams, IItemQuery, IItemUpdate } from "../types";
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
  isItemExists,
  updateItem,
} from "../services/items.services";
import { ZodError } from "zod";

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
    const { limit, page } = await getItemsQuerySchema.parseAsync(query);

    const items = await getManyItems({
      limit,
      page,
    });
    return res.status(200).json({
      data: items,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send({ error });
    }
    return res.status(500).send({ error });
  }
};

export const getUserItems = async (
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
    const { limit, page, user_id, category_id, condition } =
      await getItemsQuerySchema.parseAsync(query);

    const items = await getManyItems(
      {
        limit,
        page,
      },
      {
        user_id,
        category_id,
        condition,
      },
    );
    return res.status(200).json({
      items,
      limit,
      page,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send({ error });
    }
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
      return res.status(400).send({ error });
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
    const newItem = await itemsCreateSchema.parseAsync(body);

    const item = await createItem(newItem);

    return res.status(201).json(item);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send({ error });
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
      return res.status(400).send({ error });
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
      return res.status(400).send({ error });
    }
    return res.status(500).send({ error });
  }
};
