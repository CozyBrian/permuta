import express from "express";
import { getLatestBid, getUserLatestBid } from "../controllers/bids.controller";

const BidsRouter = express.Router();

BidsRouter.get("/:id", getLatestBid);
BidsRouter.get("/:id/me", getUserLatestBid);

export default BidsRouter;
