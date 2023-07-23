import { IUserCreate, IUserUpdate } from "../types";
import Prisma from "./prisma";
import { Prisma as PrismaClient } from "@prisma/client";

export const getManyUsers = async (
  {
    limit = 10,
    page = 1,
  }: {
    limit?: number;
    page?: number;
  },
  filter?: PrismaClient.usersFindManyArgs["where"],
) => {
  return await Prisma.users.findMany({
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      username: true,
      email: true,
      full_name: true,
      gender: true,
      phone_number: true,
      hostel_id: true,
      image_url: true,
      created_at: true,
      updated_at: true,
    },
    orderBy: {
      full_name: "asc",
    },
    where: filter,
  });
};

export const createUser = async (user: IUserCreate) => {
  const newUser = await Prisma.users.create({
    data: {
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      image_url: user.image_url,
      hostel_id: user.hostel_id,
    },
  });

  return newUser;
};

export const updateSchema = async (user: IUserUpdate) => {
  const updatedUser = await Prisma.users.update({
    where: {
      id: user.id,
    },
    data: {
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      phone_number: user.phone_number,
      image_url: user.image_url,
      hostel_id: user.hostel_id,
    },
  });

  return updatedUser;
};

export const getUserById = async (
  id: string,
  include: PrismaClient.usersFindUniqueArgs["include"],
) => {
  const user = await Prisma.users.findUnique({
    where: {
      id,
    },
    include: include,
  });

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await Prisma.users.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const isUserExists = async (user: { id?: string; email?: string }) => {
  return !!(await Prisma.users.findUnique({
    where: {
      id: user.id,
      email: user.email,
    },
    select: {
      id: true,
    },
  }));
};

export const isUsernameExists = async (username: string) => {
  return !!(await Prisma.users.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  }));
};
