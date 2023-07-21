import express from "express";
import {
  deleteItemById,
  getAllItems,
  getItemDetails,
  patchItem,
  postItem,
} from "../controllers/items.controller";

const itemsRouter = express.Router();

itemsRouter.get("/", getAllItems);
itemsRouter.get("/:id", getItemDetails);
itemsRouter.post("/", postItem);
itemsRouter.patch("/:id", patchItem);
itemsRouter.delete("/:id", deleteItemById);

export default itemsRouter;
