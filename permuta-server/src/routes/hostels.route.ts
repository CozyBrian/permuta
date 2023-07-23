import { Router } from "express";
import {
  getHostelDetails,
  getHostels,
} from "../controllers/hostels.controller";

const HostelsRouter = Router();

HostelsRouter.get("/", getHostels);
HostelsRouter.get("/:id", getHostelDetails);

export default HostelsRouter;
