import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const addBooking = async (req: Request, res: Response) => {
  try {
    const {booking, vehicle} = await bookingServices.addBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        ...booking,
        vehicle
      }
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingControllers = {
    addBooking,

};
