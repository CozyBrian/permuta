import { IUserCreate, IUserUpdate } from "../types";
import Prisma from "./prisma";

export const createUser = async (user: IUserCreate) => {
  const newUser = await Prisma.users.create({
    data: {
      full_name: user.full_name,
      username: user.username,
      email: user.email,
      password: user.password,
      phone_number: user.phone_number,
      image_url: user.image_url,
      year_of_study: user.year_of_study,
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
      year_of_study: user.year_of_study,
    },
  });

  return updatedUser;
};

export const getUserById = async (id: string) => {
  const user = await Prisma.users.findUnique({
    where: {
      id,
    },
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
