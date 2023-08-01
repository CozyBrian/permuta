import { IAuctionCreate, IAuctionUpdate } from "../types";
import { Prisma as PrismaClient } from "@prisma/client";
import Prisma from "./prisma";

export const createAnAuction = async (data: IAuctionCreate) => {
  return await Prisma.auctions.create({
    data: {
      ...data,
    },
  });
};

export const updateAnAuction = async (data: IAuctionUpdate) => {
  return await Prisma.auctions.update({
    data: {
      ...data,
    },
    where: {
      id: data.id,
    },
  });
};

export const getAllAuctions = async (
  {
    limit = 10,
    page = 1,
  }: {
    limit?: number;
    page?: number;
  },
  filter?: PrismaClient.auctionsFindManyArgs["where"],
) => {
  return await Prisma.auctions.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: filter,
  });
};

export const GetAuctionDetails = async (auction_id: string) => {
  return await Prisma.auctions.findUnique({
    where: {
      id: auction_id,
    },
  });
};

export const deleteAnAuction = async (auction_id: string) => {
  return await Prisma.auctions.delete({
    where: {
      id: auction_id,
      status: "CLOSE",
    },
  });
};

export const isAuctionExists = async (id: string) => {
  return !!(await Prisma.auctions.findUnique({
    where: {
      id,
    },
  }));
};

export const getTotalAuctionCount = async () => {
  return await Prisma.auctions.count();
};
