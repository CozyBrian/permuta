import { Prisma as PrismaClient } from "@prisma/client";
import Prisma from "./prisma";

export const getManyHostels = async (
  {
    limit = 10,
    page = 1,
  }: {
    limit?: number;
    page?: number;
  },
  filter?: PrismaClient.hostelsFindManyArgs["where"],
) => {
  return await Prisma.hostels.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      name: "asc",
    },
    where: filter,
  });
};

export const getOneHostel = async (id: string) => {
  return await Prisma.hostels.findUnique({
    where: {
      id,
    },
  });
};

export const isHostelExists = async (id: string) => {
  return !!(await Prisma.hostels.findUnique({
    where: {
      id,
    },
  }));
};

export const getTotalHostelCount = async () => {
  return await Prisma.hostels.count();
};
