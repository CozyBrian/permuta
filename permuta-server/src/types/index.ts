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
import {
  auctionsCreateSchema,
  auctionsSchema,
  auctionsUpdateSchema,
  getAuctionParamsSchema,
} from "../schema/auctions.schema";
import { bidsCreateSchema, bidsSchema } from "../schema/bids.schema";
import { Prisma } from "@prisma/client";

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

export type IAuction = z.infer<typeof auctionsSchema>;
export type IAuctionCreate = z.infer<typeof auctionsCreateSchema>;
export type IAuctionUpdate = z.infer<typeof auctionsUpdateSchema>;
export type IAuctionParams = z.infer<typeof getAuctionParamsSchema>;

export type IBid = z.infer<typeof bidsSchema>;
export type IBidCreate = z.infer<typeof bidsCreateSchema>;

export type IauctionFilter =
  | (Prisma.Without<
      Prisma.AuctionsNullableRelationFilter,
      Prisma.auctionsWhereInput
    > &
      Prisma.auctionsWhereInput)
  | (Prisma.Without<
      Prisma.auctionsWhereInput,
      Prisma.AuctionsNullableRelationFilter
    > &
      Prisma.AuctionsNullableRelationFilter)
  | null
  | undefined;
