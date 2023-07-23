import { z } from "zod";
import {
  getUserDetailsQuerySchema,
  getUsersParamsSchema,
  getUsersQuerySchema,
  userCreateSchema,
  userLoginSchema,
  userSchema,
  userUpdateSchema,
} from "../schema/users.schema";
import {
  getItemsParamsSchema,
  getItemsQuerySchema,
  itemsCreateSchema,
  itemsSchema,
  itemsUpdateSchema,
} from "../schema/items.schema";
import {
  getHostelsParamsSchema,
  getHostelsQuerySchema,
} from "../schema/hostels.schema";

export type IUser = z.infer<typeof userSchema>;
export type IUserCreate = z.infer<typeof userCreateSchema>;
export type IUserUpdate = z.infer<typeof userUpdateSchema>;
export type IUserLogin = z.infer<typeof userLoginSchema>;
export type IUserQuery = z.infer<typeof getUsersQuerySchema>;
export type IUserParams = z.infer<typeof getUsersParamsSchema>;
export type IUserDetailsQuery = z.infer<typeof getUserDetailsQuerySchema>;

export type IItem = z.infer<typeof itemsSchema>;
export type IItemCreate = z.infer<typeof itemsCreateSchema>;
export type IItemUpdate = z.infer<typeof itemsUpdateSchema>;
export type IItemQuery = z.infer<typeof getItemsQuerySchema>;
export type IItemParams = z.infer<typeof getItemsParamsSchema>;

export type IHostelsQuery = z.infer<typeof getHostelsQuerySchema>;
export type IHostelsParams = z.infer<typeof getHostelsParamsSchema>;
