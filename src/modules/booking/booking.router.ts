import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post(
  "/bookings",
  auth("admin", "customer"),
  bookingControllers.addBooking
);

export const bookingRoutes = router;
