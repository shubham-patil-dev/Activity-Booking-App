import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  bookActivity,
  getMyBookings,
} from "../controllers/bookingController.js";

const bookingRouter = Router();

bookingRouter.post("/", protect, bookActivity);
bookingRouter.get("/me", protect, getMyBookings);

export default bookingRouter;
