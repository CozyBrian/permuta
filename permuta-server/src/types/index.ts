import { z } from "zod";
import {
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
import { getHostelsParams, getHostelsQuery } from "../schema/hostels.schema";

export type IUser = z.infer<typeof userSchema>;
export type IUserCreate = z.infer<typeof userCreateSchema>;
export type IUserUpdate = z.infer<typeof userUpdateSchema>;
export type IUserLogin = z.infer<typeof userLoginSchema>;

export type IItem = z.infer<typeof itemsSchema>;
export type IItemCreate = z.infer<typeof itemsCreateSchema>;
export type IItemUpdate = z.infer<typeof itemsUpdateSchema>;
export type IItemQuery = z.infer<typeof getItemsQuerySchema>;
export type IItemParams = z.infer<typeof getItemsParamsSchema>;

export type IHostelsQuery = z.infer<typeof getHostelsQuery>;
export type IHostelsParams = z.infer<typeof getHostelsParams>;
