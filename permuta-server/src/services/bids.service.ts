import { IBidCreate } from "../types";
import Prisma from "./prisma";

export const createBid = async (bid: IBidCreate) => {
  return await Prisma.bids.create({
    data: {
      auction_id: bid.auction_id,
      bidder_id: bid.bidder_id,
      amount: bid.amount,
    },
  });
};

export const getLatestAuctionBid = async (auction_id: string) => {
  return await Prisma.bids.findFirst({
    where: {
      auction_id,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

export const getUserHighestBid = async (
  auction_id: string,
  bidder_id: string,
) => {
  return await Prisma.bids.findFirst({
    where: {
      auction_id,
      bidder_id,
    },
    orderBy: {
      amount: "desc",
    },
  });
};

export const createBidWithSocket = async (bid: IBidCreate) => {
  try {
    const latestBid = await getLatestAuctionBid(bid.auction_id);
    if (latestBid && latestBid.amount >= bid.amount) {
      throw new Error("Bid amount is lower than current bid");
    }
    const userHighestBid = await getUserHighestBid(
      bid.auction_id,
      bid.bidder_id,
    );
    if (userHighestBid && userHighestBid.amount >= bid.amount) {
      throw new Error("Bid amount is lower than current bid");
    }
    const newBid = await createBid(bid);

    return newBid;
  } catch (error) {
    return (error as { message: string }).message;
  }
};
