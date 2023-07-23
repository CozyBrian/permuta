import Prisma from "./prisma";

export const getManyCategory = () => {
  return Prisma.category.findMany();
};
