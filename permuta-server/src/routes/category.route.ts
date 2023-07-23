import { Router } from "express";
import { getCategories } from "../controllers/category.controller";

const CategoryRouter = Router();

CategoryRouter.get("/", getCategories);

export default CategoryRouter;
