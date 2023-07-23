import { Request, Response } from "express";
import { getManyCategory } from "../services/category.service";

export const getCategories = async (_: Request, res: Response) => {
  try {
    const categories = await getManyCategory();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};
