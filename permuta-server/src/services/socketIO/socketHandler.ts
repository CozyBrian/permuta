import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { IBidCreate } from "../../types";
import { createBidWithSocket } from "../bids.service";

export default async function SocketHandler(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
) {
  socket.on("SubscribeAuction", (auctionID) => {
    socket.join(auctionID);
  });
  socket.on("UnsubscribeAuction", (auctionID) => {
    socket.leave(auctionID);
  });

  socket.on("UserBid", async (Bid: IBidCreate) => {
    const newBid = await createBidWithSocket(Bid);

    if (typeof newBid === "string") {
      socket.emit("AuctionEvent", {
        type: "error",
        message: newBid,
      });
      return;
    }
    socket.to(Bid.auction_id).emit("AuctionEvent", {
      type: "bid",
      bid: newBid,
    });
    socket.emit("AuctionEvent", {
      type: "bid",
      bid: newBid,
    });
  });
}
