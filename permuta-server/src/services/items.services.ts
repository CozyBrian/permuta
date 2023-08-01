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
    select: {
      id: true,
      name: true,
      price: true,
      image_url: true,
      category_id: true,
      seller: {
        select: {
          username: true,
          hostel: {
            select: { name: true },
          },
        },
      },
      auctions: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    where: filter,
  });
};

export const getTotalItemCount = async () => {
  return await Prisma.items.count();
};

export const getOneItem = async (id: string) => {
  return await Prisma.items.findUnique({
    where: {
      id,
    },

    include: {
      category: {
        select: {
          name: true,
        },
      },
      seller: {
        select: {
          username: true,
          hostel: {
            select: { name: true },
          },
        },
      },
      auctions: true,
    },
  });
};

export const createItem = async (data: IItemCreate) => {
  if (data.auction) {
    return await Prisma.items.create({
      data: {
        ...data,
        auctions: {
          create: {
            ...data.auction,
          },
        },
      },
    });
  } else {
    return await Prisma.items.create({
      data: {
        ...data,
      },
    });
  }
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
