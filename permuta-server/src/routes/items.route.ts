import express from "express";
import {
  deleteItemById,
  getAllItems,
  getItemDetails,
  patchItem,
  postItem,
} from "../controllers/items.controller";
import MulterUpload from "../middlewares/multer";

const itemsRouter = express.Router();

itemsRouter.get("/", getAllItems);
itemsRouter.get("/:id", getItemDetails);
itemsRouter.post("/", MulterUpload, postItem);
itemsRouter.patch("/:id", patchItem);
itemsRouter.delete("/:id", deleteItemById);

export default itemsRouter;
