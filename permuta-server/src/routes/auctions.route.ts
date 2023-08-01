import express from "express";
import {
  deleteAuction,
  getAuction,
  getAuctions,
  patchAuction,
  postAuction,
} from "../controllers/auctions.controller";

const AuctionsRouter = express.Router();

AuctionsRouter.get("/", getAuctions);
AuctionsRouter.get("/:id", getAuction);
AuctionsRouter.post("/", postAuction);
AuctionsRouter.patch("/:id", patchAuction);
AuctionsRouter.delete("/:id", deleteAuction);

export default AuctionsRouter;
