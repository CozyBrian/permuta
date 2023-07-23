import { Prisma as PrismaClient } from "@prisma/client";
import { IItemCreate, IItemUpdate } from "../types";
import Prisma from "./prisma";

export const getManyItems = async (
  {
    limit = 10,
    page = 1,
  }: {
    limit?: number;
    page?: number;
  },
  filter?: PrismaClient.itemsFindManyArgs["where"],
) => {
  return await Prisma.items.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      created_at: "desc",
    },
    where: filter,
  });
};

export const getOneItem = async (id: string) => {
  return await Prisma.items.findUnique({
    where: {
      id,
    },
  });
};

export const createItem = async (data: IItemCreate) => {
  return await Prisma.items.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      image_url: data.image_url,
      category_id: data.category_id,
      seller_id: data.seller_id,
      condition: data.condition,
    },
  });
};

export const updateItem = async (data: IItemUpdate) => {
  return await Prisma.items.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
    },
  });
};

export const deleteItem = async (id: string) => {
  return await Prisma.items.delete({
    where: {
      id,
    },
  });
};

export const isItemExists = async (id: string) => {
  return !!(await Prisma.items.findUnique({
    where: {
      id,
    },
  }));
};
