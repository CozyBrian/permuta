import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

const validateInput =
  (schema: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e: unknown) {
      console.log(e);
      return next(e);
    }
  };

export default validateInput;
