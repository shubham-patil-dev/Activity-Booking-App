import { Router } from "express";
import { listActivities } from "../controllers/activityController.js";

const activityRouter = Router();

activityRouter.get("/", listActivities);

export default activityRouter;
